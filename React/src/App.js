import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box'
import AuthRoute from './AuthRoute';
import {Login, Protected} from './pages';
import Loading from './Loading';
import Alert from './Alert';
import axios from 'axios';

export default function App(props) {
  console.log('App re-render:', props);
  const history = useHistory();

  const axiosRedirectSetup = options => {
    const {axios,  errStatusCode, redirectUrl} = options;
    axios.interceptors.response.use(
      function(response){
        console.log('### in intercepter:', response)
        return response;
      },
      async function(error){
        console.log(error.response)
        if(error.response.status === errStatusCode.refreshTokenExpires){
          history.push(redirectUrl);
          return Promise.reject(error);
        }
        if(error.response.status === errStatusCode.accessTokenExpires){
          const response = await axios.post('/refreshToken', {returnAccessTokenBy: 'body'});
          const {success, accessToken} = response.data;
          if(success){
            axios.defaults.params = {
              ...axios.defaults.params,
              accessToken
            }
            const {params, ...rest} = error.config;
            const originalRequestConfig = {
              params: {...params, accessToken},
              ...rest
            }   
            const origResponse = await axios.request(originalRequestConfig);
            return origResponse;       
          }
        }
        return Promise.reject(error);
      }
    )
  }

  const axiosRedirectRelease = interceptor => {
    axios.interceptors.response.eject(interceptor);
  }

  const [isFetching, setIsFetching] = React.useState(true);
  const [tokenValid, setTokenValid] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSevirity] = React.useState('info');
  const [useAccessTokenIn, setUseAccessTokenIn] = React.useState('query')

  React.useEffect(() => {
    axios.defaults.params = {
      ...axios.defaults.params,
      useAccessTokenIn
    }
  },[useAccessTokenIn])

  React.useEffect(() => {
    const errStatusCode = {
      'refreshTokenExpires': 401,
      'accessTokenExpires': 499
    }
    const interceptor = axiosRedirectSetup({axios, errStatusCode, redirectUrl:'/pages/login'})
    axios.get('/decodeToken')
    .then(res => {
        const {authenticated} = res.data;
        console.log('#######:', res.data)
        if(authenticated === true){
            setTimeout(() => {
              console.log('##### setting token valid true')
              setTokenValid(true);
              setIsFetching(false);
            },500)
        } else {
          setTimeout(() => {
            setTokenValid(false);
            setIsFetching(false);
          },500)
        }
    })
    .catch(err => {
        setTimeout(() => {
          showAlert({severity:'error', message: err.message})
          setTokenValid(false)
          setIsFetching(false);
        }, 500)

    })

    return () => {
      axiosRedirectRelease(interceptor)
    }
  },[]) 

  const showAlert = options => {
    const {message, severity} = options;
    setAlertMessage(message);
    setAlertSevirity(severity);
    setOpenAlert(true);
  }

  return (
    <div>
      {isFetching ? 
        <Loading open={isFetching} message={"Check Authenticated.."}></Loading> :
        <Switch>
          <Route exact path="/">
            <Login showAlert={showAlert} setTokenValid={setTokenValid} useAccessTokenIn={useAccessTokenIn}></Login> 
          </Route> 
          <Route exact path="/pages/login">
            <Login showAlert={showAlert} setTokenValid={setTokenValid} useAccessTokenIn={useAccessTokenIn}></Login>
          </Route>
          <AuthRoute 
            tokenValid={tokenValid} 
            setTokenValid={setTokenValid} 
            showAlert={showAlert} 
            path="/pages/private/:resource"
          >
            <Protected></Protected>
          </AuthRoute>
        </Switch>
      }
      <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        alertMessage={alertMessage}
        severity={alertSeverity}
      ></Alert>
    </div>

  )
}
