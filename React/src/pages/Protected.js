import React from 'react';
import {useParams, NavLink} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

function Protected(props) {
    console.log('Protected re-render: ', props);
    const {
        history
    } = props;
    const {resource} = useParams();
    const [isFetching, setIsFetching] = React.useState(true);
    const [tokenDecoded, setTokenDecoded] = React.useState({});
    const [remainSeconds, setRemainSeconds] = React.useState('calculating...');
    React.useEffect(() => {
        let expTimer;
        axios.get('/protected')
        .then(res => {
            console.log(res.data);
            const tokenDecoded = res.data;
            const {exp} = tokenDecoded;
            setTokenDecoded(tokenDecoded);
            setIsFetching(false);
            expTimer = setInterval(() => {
                const remainSec = parseInt((exp*1000 - Date.now())/1000).toFixed(0);
                if(remainSec <= 0) {
                    setRemainSeconds('expired');
                    return
                }
                setRemainSeconds(remainSec);
            },1000)
        })
        .catch(err => {
            setIsFetching(false);
            console.log(err)
        })
        return () => {
            console.log('dismount Protected')
            clearInterval(expTimer);
        }
    },[resource])
    return (
        <Box display="flex" flexDirection="column" m="auto" mt="80px" width="30%">
            {isFetching === false &&      
            <React.Fragment>
                {Object.entries(tokenDecoded).map(([key, value]) => {
                    return (
                        <Box display="flex">
                            <Box>{key} :</Box>
                            <Box>{value}</Box>
                        </Box>
                    )
                })}
                <Box fontSize="20px" mb="20px">
                    {remainSeconds === 'expired' ?
                        'Token expired!!':
                        `Token expires in [${remainSeconds}] secs.`
                    }
                </Box>
                <Divider/>
                <Box fontSize="30px" mt="20px">
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