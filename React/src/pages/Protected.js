import React from 'react';
import {useParams} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Menu from './Menu';
import Download from './Download';
import BenchMark from './BenchMark';
import BenchMarkAuthReq from './BenchMarkAuthReq';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router';
import axios from 'axios';

function Protected(props) {
    console.log('Protected re-render: ', props);
    const {accessToken, accessTokenDecoded} = props;
    const {setAccessToken, setAccessTokenDecoded, setRefreshTokenDecoded} = props;
    const {refreshTokenDecoded} = props;
    const history = useHistory();
    const {resource} = useParams();
    const [isFetching, setIsFetching] = React.useState(true);
    const [accessRemainSeconds, setAccessRemainSeconds] = React.useState('calculating.');
    const [refreshRemainSeconds, setRefreshRemainSeconds] = React.useState('calculating.');

    React.useEffect(() => {
        console.log('### set timer for token expiry')
        if(accessTokenDecoded === '' || refreshTokenDecoded === ''){
            return
        }
        let expAccessTimer, expRefreshTimer;

        const origAccessToken = refreshTokenDecoded.accessToken;
        refreshTokenDecoded.accessToken = 
        origAccessToken.substr(1,10) + 
        '...' +  
        origAccessToken.substr(origAccessToken.length -5)
        const accessTokenExp = accessTokenDecoded.exp;
        const refreshTokenExp = refreshTokenDecoded.exp;
        expAccessTimer = setInterval(() => {
            const remainSec = parseInt((accessTokenExp*1000 - Date.now())/1000).toFixed(0);
            console.log('####', remainSec, accessTokenExp*1000, Date.now())
            if(remainSec <= 0) {
                setAccessRemainSeconds('expired');
                clearInterval(expAccessTimer);
                return
            }
            setAccessRemainSeconds(remainSec);
        },1000)
        expRefreshTimer = setInterval(() => {
            const remainSec = parseInt((refreshTokenExp*1000 - Date.now())/1000).toFixed(0);
            if(remainSec <= 0) {
                setRefreshRemainSeconds('expired');
                clearInterval(expRefreshTimer);
                return
            }
            setRefreshRemainSeconds(remainSec);
        },1000)
        return () => {
            console.log('dismount Protected')
            clearInterval(expAccessTimer);
            clearInterval(expRefreshTimer);
        }
    },[accessTokenDecoded, refreshTokenDecoded]);

    React.useEffect(() => {        
        axios.get('/private')
        .then(res => {
            console.log(res);
            if(refreshTokenDecoded === ''){
                // refresh(F5) occurred. need to set accessToken and refreshToken;
                const {refreshTokenDecoded, accessTokenDecoded} = res.data;
                const origAccessToken = refreshTokenDecoded.accessToken;
                setAccessToken(origAccessToken)
                refreshTokenDecoded.accessToken = 
                origAccessToken.substr(1,10) + 
                '...' +  
                origAccessToken.substr(origAccessToken.length -5)               
                setAccessTokenDecoded(accessTokenDecoded);
                setRefreshTokenDecoded(refreshTokenDecoded);
            }
            setIsFetching(false);
        })
        .catch(err => {
            setIsFetching(false);
            console.log(err)
        })

    },[resource])

    const onClickLogout = React.useCallback(() => {
        axios.defaults.params = {
            ...axios.defaults.params,
            accessToken: ''
        }
        window.localStorage.setItem('logout', Date.now());
        history.push('/pages/login')
    },[])
    return (
        <Box display="flex" flexDirection="column" m="auto" mt="80px" minWidth="550px" width="40%">
            {isFetching === false &&      
            <React.Fragment>
                <Box display="flex" mb="10px">
                    <Box display="flex" flexDirection="column" width="50%" m="5px">
                        <Box color={accessRemainSeconds==='expired' && 'red'} mb="5px">Access Token: remains [{accessRemainSeconds}]</Box>
                        <Box border={1}>
                            {Object.entries(accessTokenDecoded).map(([key, value]) => {
                                return (
                                    <Box p="3px" display="flex">
                                            <Box>{key} :</Box>
                                            <Box>{value}</Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" width="50%" m="5px">
                        <Box color={refreshRemainSeconds==='expired' && 'red'} mb="5px">Refresh Token: remains [{refreshRemainSeconds}]</Box>
                        <Box border={1}>
                            {Object.entries(refreshTokenDecoded).map(([key, value]) => {
                                return (
                                    <Box p="3px" display="flex">
                                            <Box>{key} :</Box>
                                            <Box>{value}</Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>


                <Divider/>
                <Box fontSize="30px" mt="10px">
                    {resource} page
                </Box>
                <Menu onClickLogout={onClickLogout}></Menu>
                {resource === 'portal' && (
                    <Box style={{"word-wrap":"break-word"}}>access token: {axios.defaults.params.accessToken}</Box>
                )}
                {resource === 'private-download' && (
                    <React.Fragment>
                        <a href={`/private/download/sample.txt?accessToken=${accessToken}`} >download file(401)</a>
                        <a href={`/private/static/download/sample.txt?accessToken=${accessToken}`} >download file(302)</a>
                    </React.Fragment>
                )}
                {resource === 'benchmark' && <BenchMark></BenchMark>}
                {resource === 'benchmarkAuthReq' && <BenchMarkAuthReq></BenchMarkAuthReq>}


            </React.Fragment>
            }
        </Box>
    )
}

export default React.memo(Protected)