import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import {Login, Protected} from './pages';
import Loading from './Loading';
import Alert from './Alert';
import axios from 'axios';

export default function App(props) {
  console.log('App re-render:', props);
  const history = useHistory();

  const axiosRedirectSetup = options => {
    const {axios,  statusCode, redirectUrl} = options;
    axios.interceptors.response.use(
      function(response){
        console.log(response);
        return response;
      },
      function(error){
        if(error.response && error.response.status === statusCode){
          history.push(redirectUrl);
        }
        return Promise.reject(error);
      }
    )
    return axios;
  }

  const axiosRedirectRelease = interceptor => {
    axios.interceptors.response.eject(interceptor);
  }

  const [isFetching, setIsFetching] = React.useState(true);
  const [tokenValid, setTokenValid] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSevirity] = React.useState('info');

  React.useEffect(() => {
    const interceptor = axiosRedirectSetup({axios, statusCode:401, redirectUrl:'/pages/login'})
    axios.get('/decodeToken')
    .then(res => {
        const authenticated = res.data;
        if(authenticated){
            setTimeout(() => {
              setTokenValid(true);
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
            <Login showAlert={showAlert} setTokenValid={setTokenValid}></Login>            
          </Route> 
          <Route exact path="/pages/login">
            <Login showAlert={showAlert} setTokenValid={setTokenValid}></Login>
          </Route>
          <AuthRoute 
            tokenValid={tokenValid} 
            setTokenValid={setTokenValid} 
            showAlert={showAlert} 
            path="/pages/protected/:resource"
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
