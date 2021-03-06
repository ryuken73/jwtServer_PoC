import React from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Box from '@material-ui/core/Box'
import AuthRoute from './AuthRoute';
import {Login, Protected, Unauth} from './pages';
import Loading from './Loading';
import Alert from './Alert';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default function App(props) {
  const history = useHistory();
  const location = useLocation();
  const {pathname, state} = location;
  console.log('App re-render:', props, pathname, props.location);

  const [accessToken, setAccessToken] = React.useState('');
  const [accessTokenDecoded, setAccessTokenDecoded] = React.useState('');
  const [refreshTokenDecoded, setRefreshTokenDecoded] = React.useState('');
  const [redirectPath, setRedirectPath] = React.useState(pathname)

  const syncLogout = e => {
    if (e.key === 'logout') {
      console.log('logged out from storage!')
      history.push('/pages/login');
    }
  }

  const axiosRedirectSetup = options => {
    const {axios,  errStatusCode, loginPageUrl, toPage} = options;
    axios.interceptors.response.use(
      // 200 resposne. just pass response
      function(response){
        console.log('### in intercepter:', response)
        return response;
      },
      async function(error){
      // not 200 response.
        console.log(error.response)
        // if response code is refresh token expired, then redirect login page.
        if(error.response.status === errStatusCode.refreshTokenExpires){
          console.log('### add toPage: ', toPage)
          history.push(loginPageUrl, {toPage});
          return Promise.reject(error);
        }
        // if response code is access token expired, then request refresh token and resend request.
        if(error.response.status === errStatusCode.accessTokenExpires){
          const response = await axios.post('/refreshToken', {returnAccessTokenBy: 'body'});
          console.log('###### after aixos post: ',response)
          const {success, accessToken} = response.data;
          console.log(success, accessToken)
          if(success){
            // set new access token (to refresh Protected component)
            setAccessToken(accessToken);
            console.log('### setAccessToken Decoded:', jwt.decode(accessToken));
            setAccessTokenDecoded(jwt.decode(accessToken));
            // replace default access token query parameter with new access token.
            axios.defaults.params = {
              ...axios.defaults.params,
              accessToken
            }
            // setup new request config. using error.config, we can resend original request.
            const {params, ...rest} = error.config;
            // manually set new access token for resend request
            const originalRequestConfig = {
              params: {...params, accessToken},
              ...rest
            }   
            // resend original request
            const origResponse = await axios.request(originalRequestConfig);
            // following response comes in original axios.method return
            return origResponse;       
          }
        }
        // if response is anything else, reject (comes in original axios's catch block)
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
    const listenLogout = window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', listenLogout)
    }
  },[])

  React.useEffect(() => {
    const errStatusCode = {
      'refreshTokenExpires': 401,
      'accessTokenExpires': 499
    }
    const interceptor = axiosRedirectSetup({axios, errStatusCode, loginPageUrl:`/pages/login`, toPage:pathname})
    axios.get('/decodeToken')
    .then(res => {
        const {authenticated} = res.data;
        console.log('####### ask decode token:', res.data)
        if(authenticated === true){
            setTimeout(() => {
              setTokenValid(true);
              setIsFetching(false);
              history.push(redirectPath)
            },300)
        } else {
          setTimeout(() => {
            setTokenValid(false);
            setIsFetching(false);
          },300)
        }
    })
    .catch(err => {
        setTimeout(() => {
          showAlert({severity:'error', message: err.message})
          setTokenValid(false)
          setIsFetching(false);
        }, 300)

    })

    return () => {
      console.log('$$$ release interceptor')
      axiosRedirectRelease(interceptor)
    }
  },[]) 

  const showAlert = React.useCallback(options => {
    const {message, severity} = options;
    setAlertMessage(message);
    setAlertSevirity(severity);
    setOpenAlert(true);
  },[])

  return (
    <div>
      {isFetching ? 
        <Loading open={isFetching} message={"Check Authenticated.."}></Loading> :
        <Switch>
          <Route exact path="/">
            <Login 
              showAlert={showAlert} 
              setTokenValid={setTokenValid} 
              useAccessTokenIn={useAccessTokenIn}
              setAccessToken={setAccessToken}
              setAccessTokenDecoded={setAccessTokenDecoded}
              setRefreshTokenDecoded={setRefreshTokenDecoded}
            ></Login> 
          </Route> 
          <Route exact path="/pages/login">
            <Login 
              showAlert={showAlert} 
              setTokenValid={setTokenValid} 
              useAccessTokenIn={useAccessTokenIn} 
              setAccessToken={setAccessToken}
              setAccessTokenDecoded={setAccessTokenDecoded}
              setRefreshTokenDecoded={setRefreshTokenDecoded}
            ></Login>
          </Route>
          <Route 
            setTokenValid={setTokenValid} 
            showAlert={showAlert} 
            path="/pages/private/:resource"
          >
            <Protected 
              accessToken={accessToken} 
              setAccessToken={setAccessToken}
              setAccessTokenDecoded={setAccessTokenDecoded}
              setRefreshTokenDecoded={setRefreshTokenDecoded}
              accessTokenDecoded={accessTokenDecoded} 
              refreshTokenDecoded={refreshTokenDecoded}
            ></Protected>
          </Route>
          <Route 
            showAlert={showAlert} 
            path="/pages/unauth/:resource"
          >
            <Unauth></Unauth>
          </Route>
          {/* <AuthRoute 
            tokenValid={tokenValid} 
            setTokenValid={setTokenValid} 
            showAlert={showAlert} 
            path="/pages/private/:resource"
          >
            <Protected></Protected>
          </AuthRoute> */}
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
