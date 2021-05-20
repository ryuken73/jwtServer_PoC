import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';

function Benchmark() {

    const [reqCount, setReqCount] = React.useState(100);
    const [reqStatus, setReqStatus] = React.useState('stopped');
    const [publicResult, setPublicResult] = React.useState(0);
    const [privateResult, setPublicPrivate] = React.useState('No Result');
    const [publicProcessed, setPublicProcessed] = React.useState(0);
    const [privateProcessed, setPrivateProcessed] = React.useState(0);

    const onChangeReqCount = event => {
        setReqCount(event.target.value);
    }

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

    const runReqPublic = React.useCallback(async () => {
        const reqNumbers = mkCounter(reqCount);
        const startTime = Date.now();
        setPublicProcessed(0)

        setReqStatus('public-start');
        for await (let reqId of reqNumbers){
            await requestPublic(reqId); 
            setPublicProcessed(processed => processed + 1)
        }

        const elapsed = Date.now() - startTime;
        setPublicResult(elapsed);
        setReqStatus('stopped');
    },[reqCount])

    return (
        <Box display="flex" flexDirection="column" m="15px">
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
                <Box width="60px">Public</Box>
                <Button variant="contained" size="small" color="primary" onClick={runReqPublic}>Start</Button>
                <Box width="auto" ml="10px">Result: {new Intl.NumberFormat().format(publicResult)} msec   [{publicProcessed}]</Box>

            </Box>
            <Box display="flex" alignItems="center" m="5px">
                <Box width="60px">Private</Box>
                <Button variant="contained" size="small" color="primary">Start</Button>
                <Box width="auto" ml="10px">Result: {privateResult}</Box>

            </Box>
        </Box>
    )
}

export default React.memo(Benchmark)
