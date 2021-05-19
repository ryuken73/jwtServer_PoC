import React from 'react';
import {useParams, NavLink} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

function Protected(props) {
    // console.log('Protected re-render: ', props);
    const {
        history
    } = props;
    const {resource} = useParams();
    const [isFetching, setIsFetching] = React.useState(true);
    const [accessTokenDecoded, setAccessTokenDecoded] = React.useState({});
    const [refreshTokenDecoded, setRefreshTokenDecoded] = React.useState({});
    const [accessRemainSeconds, setAccessRemainSeconds] = React.useState('calculating...');
    const [refreshRemainSeconds, setRefreshRemainSeconds] = React.useState('calculating...');
    React.useEffect(() => {
        let expAccessTimer, expRefreshTimer;
        axios.get('/protected')
        .then(res => {
            console.log(res);
            const {refreshTokenDecoded, accessTokenDecoded} = res.data;
            const origAccessToken = refreshTokenDecoded.accessToken;

            refreshTokenDecoded.accessToken = 
            origAccessToken.substr(1,10) + 
            '...' +  
            origAccessToken.substr(origAccessToken.length -5)
            
            const accessTokenExp = accessTokenDecoded.exp;
            const refreshTokenExp = refreshTokenDecoded.exp;
            setAccessTokenDecoded(accessTokenDecoded);
            setRefreshTokenDecoded(refreshTokenDecoded);
            setIsFetching(false);
            expAccessTimer = setInterval(() => {
                const remainSec = parseInt((accessTokenExp*1000 - Date.now())/1000).toFixed(0);
                if(remainSec <= 0) {
                    setAccessRemainSeconds('expired');
                    return
                }
                setAccessRemainSeconds(remainSec);
            },1000)
            expRefreshTimer = setInterval(() => {
                const remainSec = parseInt((refreshTokenExp*1000 - Date.now())/1000).toFixed(0);
                if(remainSec <= 0) {
                    setRefreshRemainSeconds('expired');
                    return
                }
                setRefreshRemainSeconds(remainSec);
            },1000)
        })
        .catch(err => {
            setIsFetching(false);
            console.log(err)
        })
        return () => {
            console.log('dismount Protected')
            clearInterval(expAccessTimer);
        }
    },[resource])
    return (
        <Box display="flex" flexDirection="column" m="auto" mt="80px" width="40%">
            {isFetching === false &&      
            <React.Fragment>
                <Box display="flex">
                    <Box display="flex" flexDirection="column" width="50%" m="5px">
                        <Box mb="5px">Access Token: remains [{accessRemainSeconds}]</Box>
                        <Paper>
                            {Object.entries(accessTokenDecoded).map(([key, value]) => {
                                return (
                                    <Box p="3px" display="flex">
                                            <Box>{key} :</Box>
                                            <Box>{value}</Box>
                                    </Box>
                                )
                            })}
                        </Paper>
                    </Box>
                    <Box display="flex" flexDirection="column" width="50%" m="5px">
                        <Box mb="5px">Refresh Token: remains [{refreshRemainSeconds}]</Box>
                        <Paper>
                            {Object.entries(refreshTokenDecoded).map(([key, value]) => {
                                return (
                                    <Box p="3px" display="flex">
                                            <Box>{key} :</Box>
                                            <Box>{value}</Box>
                                    </Box>
                                )
                            })}
                        </Paper>
                    </Box>
                </Box>


                <Divider/>
                <Box fontSize="30px" mt="10px">
                    {resource} page
                </Box>
                <Box>
                    <Box><NavLink to="/pages/protected/portal">Portal</NavLink></Box>
                    <Box><NavLink to="/pages/protected/mail">Mail</NavLink></Box>
                    <Box><NavLink to="/pages/protected/userInfo">UserInfo</NavLink></Box>
                </Box>
            </React.Fragment>
            }
        </Box>
    )
}

export default React.memo(Protected)