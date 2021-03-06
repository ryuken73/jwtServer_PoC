import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import axios from 'axios';

function AuthRoute(props) {
    console.log('AuthRoute re-render: ', props);
    const {
        children,
        tokenValid=false,
        setTokenValid=()=>{},
        ...rest
    } = props;
    React.useEffect(() => {
        axios.get('/decodeToken')
        .then(res => {
            const authenticated = res.data;
            if(authenticated){
                setTokenValid(true)
            }
        })
        .catch(err => {
            console.log('token expire. redirect login page.')
            setTokenValid(false)
        })
    },[setTokenValid])
    return (
        <Route
            {...rest}
            render={({location}) => 
                tokenValid ? (children) :
                (<Redirect
                    to={{
                        pathname: '/pages/login',
                        state: {from: location}
                    }}
                ></Redirect>)
            }
        >            
        </Route>
    )
}

export default React.memo(AuthRoute)