import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {useParams} from 'react-router-dom';
import Menu from './Menu';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Unauth(props) {
    const {resource} = useParams();
    const history = useHistory();

    const onClickLogout = React.useCallback(() => {
        axios.defaults.params = {
            ...axios.defaults.params,
            accessToken: ''
        }
        window.localStorage.setItem('logout', Date.now());
        history.push('/pages/login')
    },[])

    const downloadUnauth = e => {
        axios.get('/public/download/sample.txt')
    }

    return (
        <Box display="flex" flexDirection="column" m="auto" mt="80px" minWidth="550px" width="40%">
            <Box height={"255px"}></Box>
            <Divider/>
            <Box fontSize="30px" mt="10px">
                {resource} page
            </Box>
            <Menu onClickLogout={onClickLogout}></Menu>
            {/* {resource === 'unauth-download' && <Button variant="outlined" onClick={downloadUnauth}>{resource}</Button>} */}
            {resource === 'unauth-download' && <a href="/public/download/sample.txt" download>download file</a>}
        </Box>           
    )
}

export default React.memo(Unauth)