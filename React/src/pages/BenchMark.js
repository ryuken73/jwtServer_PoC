import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';

function Benchmark() {

    const [reqCount, setReqCount] = React.useState(100);
    const [reqStatus, setReqStatus] = React.useState('stopped');
    const [publicResult, setPublicResult] = React.useState(0);
    const [privateResult, setPrivateResult] = React.useState(0);
    const [publicProcessed, setPublicProcessed] = React.useState(0);
    const [privateProcessed, setPrivateProcessed] = React.useState(0);

    const onChangeReqCount = React.useCallback(event => {
        setReqCount(event.target.value);
    }, [])

    function* mkCounter(max){
        let current = 0;
        while(current < max){
            yield current;
            current += 1;
        }
    }

    const requestPublic = reqId => {
        return axios.get(`/public/echo/${reqId}`)
    }

    const requestPrivate = reqId => {
        return axios.get(`/private/echo/${reqId}`)
    }

    const runReqPublic = React.useCallback(async () => {
        setReqStatus('started');
        const reqNumbers = mkCounter(reqCount);
        const startTime = Date.now();
        setPublicResult(0)
        setPublicProcessed(0)
        for await (let reqId of reqNumbers){
            await requestPublic(reqId); 
            setPublicProcessed(processed => processed + 1)
        }

        const elapsed = Date.now() - startTime;
        setPublicResult(elapsed);
        setReqStatus('stopped');
    },[reqCount])

    
    const runReqPrivate = React.useCallback(async () => {
        setReqStatus('started');
        const reqNumbers = mkCounter(reqCount);
        const startTime = Date.now();
        setPrivateResult(0)
        setPrivateProcessed(0)
        for await (let reqId of reqNumbers){
            await requestPrivate(reqId); 
            setPrivateProcessed(processed => processed + 1)
        }

        const elapsed = Date.now() - startTime;
        setPrivateResult(elapsed);
        setReqStatus('stopped');
    },[reqCount])

    const ButtonCustom = (props) => {
        return (
        <Button 
            disabled={reqStatus === 'started'} 
            variant="contained" 
            size="small" 
            color="primary" 
            {...props}
        >
            {props.children}
        </Button>
        )
    }

    return (
        <Box display="flex" flexDirection="column" m="5px">
            <Box>
                <TextField 
                    variant="outlined" 
                    label="request count" 
                    margin="dense" 
                    size="small"
                    value={reqCount}
                    onChange={onChangeReqCount}
                ></TextField>
            </Box>
            <Box display="flex" alignItems="center" m="5px"> 
                <Box width="100px">Echo(Public)</Box>
                <ButtonCustom onClick={runReqPublic}>Start</ButtonCustom>
                <Box width="auto" ml="10px">Result: {new Intl.NumberFormat().format(publicResult)} msec   [{publicProcessed}]</Box>

            </Box>
            <Box display="flex" alignItems="center" m="5px">
                <Box width="100px">Echo(Private)</Box>
                <ButtonCustom onClick={runReqPrivate}>Start</ButtonCustom>
                <Box width="auto" ml="10px">Result: {new Intl.NumberFormat().format(privateResult)} msec   [{privateProcessed}]</Box>

            </Box>
        </Box>
    )
}

export default React.memo(Benchmark)
