import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from 'react-router';
import Loading from '../Loading';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const {
    setTokenValid,
    showAlert
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [userId, setUserId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [jwtExpire, setJwtExpire] = React.useState(10);
  const [isFetching, setIsFetching] = React.useState(false);

  const onChangeId = event => setUserId(event.target.value);
  const onChangePassword = event => setPassword(event.target.value);

  const onKeyUp = event => {
    if(event.keyCode === 13){
      onSubmit();
    }
  }

  const onChangeExp = event => {
    console.log(event.target.value);
    if(event.target.value === ''){
      setJwtExpire(0);
      return
    }
    if(parseInt(event.target.value) !== NaN){
      setJwtExpire(parseInt(event.target.value));
    }
  }

  const onSubmit = event => {
    console.log('submit:', userId, password);
    setIsFetching(true);
    setTimeout(() => {
      axios.post('/login', {
          username:userId,
          password:password,
          exp: jwtExpire
      }).
      then(res => {
          console.log(res.data)
          const {authenticated, redirect, errMsg} = res.data;
          if(authenticated === true){
            setTokenValid(true)
            history.push('/protected');
            setIsFetching(false)
            showAlert({severity:'success', message: 'login success!'})
            return;
          }
          setIsFetching(false)
          showAlert({severity:'error', message: errMsg})
      })
      .catch(err => {
          console.error(err)
          setIsFetching(false)
      })
    }, 1000)

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isFetching && <Loading open={isFetching} message={"Check Authenticated.."}></Loading> }
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.div} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userId}
            onChange={onChangeId}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
            onKeyDown={onKeyUp}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Box display="flex" alignItems="center" width="100%">
            <Box width="100%">Token Expires in(sec)</Box>
            <Box width="100%">
              <TextField variant="outlined" size="small" margin="dense" value={jwtExpire} onChange={onChangeExp}></TextField>
            </Box>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default React.memo(Login)