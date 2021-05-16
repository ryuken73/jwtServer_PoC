import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import {Login, Protected, Home} from './pages';
import axios from 'axios';

export default function App(props) {
  console.log('App re-render:', props);
  const [tokenValid, setTokenValid] = React.useState(false);
  React.useEffect(() => {
    axios.get('/decodeToken')
    .then(res => {
        const authenticated = res.data;
        if(authenticated){
            setTokenValid(true)
        }
    })
    .catch(err => {
        console.log(err)
        setTokenValid(false)
    })
  },[]) 
  return (
    <Switch>
      <Route exact path="/login">
        <Login setTokenValid={setTokenValid}></Login>
      </Route>
      <AuthRoute tokenValid={tokenValid} setTokenValid={setTokenValid} exact path="/protected">
        <Protected></Protected>
      </AuthRoute>
      <Route exact path="/" component={Home}/>
    </Switch>
  )
}
