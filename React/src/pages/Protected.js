import React from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';

function Protected(props) {
    console.log('Protected re-render: ', props);
    const {
        history
    } = props;
    const [tokenValue, setTokenValue]= React.useState('');
    React.useEffect(() => {
        axios.get('/protected')
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    return (
        <div>
            <Box>
                Protected Page
                <Box>
                    {tokenValue}
                </Box>
            </Box>
        </div>

    )
}

export default React.memo(Protected)