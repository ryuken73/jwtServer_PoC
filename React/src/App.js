import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Box from '@material-ui/core/Box'
import AuthRoute from './AuthRoute';
import {Login, Protected, UserInfo, Home} from './pages';
import Loading from './Loading';
import Alert from './Alert';
import axios from 'axios';

export default function App(props) {
  console.log('App re-render:', props);
  const [isFetching, setIsFetching] = React.useState(true);
  const [tokenValid, setTokenValid] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSevirity] = React.useState('info');

  React.useEffect(() => {
    axios.get('/decodeToken')
    .then(res => {
        const authenticated = res.data;
        if(authenticated){
            setTimeout(() => {
              setTokenValid(true);
              setIsFetching(false);
            },1000)

        }
    })
    .catch(err => {
        setTimeout(() => {
          showAlert({severity:'error', message: err.message})
          setTokenValid(false)
          setIsFetching(false);
        }, 1000)

    })
  },[]) 

  const showAlert = options => {
    const {message, severity} = options;
    setAlertMessage(message);
    setAlertSevirity(severity);
    setOpenAlert(true);
  }

  const hideAlert = () => {
    setOpenAlert(false)
  }

  return (
    <div>
      {isFetching ? 
        <Loading open={isFetching} message={"Check Authenticated.."}></Loading> :
        <Switch>
          <Route exact path="/pages/login">
            <Login showAlert={showAlert} setTokenValid={setTokenValid}></Login>
          </Route>
          <AuthRoute 
            tokenValid={tokenValid} 
            setTokenValid={setTokenValid} 
            showAlert={showAlert} 
            exact path="/pages/protected"
          >
            <Protected></Protected>
          </AuthRoute>
          <AuthRoute 
            tokenValid={tokenValid} 
            setTokenValid={setTokenValid} 
            showAlert={showAlert} 
            exact path="/pages/userInfo"
          >
            <UserInfo></UserInfo>
          </AuthRoute>
          <Route exact path="/" component={Home}/>
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
