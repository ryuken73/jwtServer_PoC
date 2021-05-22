import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

function Menu(props){
    const {onClickLogout} = props;
    return (
        <Box display="flex">
            <Box m="5px"><NavLink to="/pages/private/portal">Portal</NavLink></Box>
            <Box m="5px"><NavLink to="/pages/unauth/unauth-download">Unauth-Download</NavLink></Box>
            <Box m="5px"><NavLink to="/pages/private/private-download">Private-Download</NavLink></Box>
            <Box m="5px"><NavLink to="/pages/private/benchmark">Benchmark</NavLink></Box>
            <Box ml="auto"><Button onClick={onClickLogout}>logout</Button></Box>
        </Box>
    )
}

export default Menu;