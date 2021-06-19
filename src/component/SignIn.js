import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from '../config';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(./banner5.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  helper:{
   marginLeft: '4px'
  }
  
}));


export default function SignInSide(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    user: ''
  });
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [usererror, setUserError] = React.useState(false);
  const [userhelperText, setUserHelperText] = React.useState('');
  const [responsehelperText, setResponseHelperText] = React.useState('');
  
  
  const handleUserTypeChange=(event)=>{
    setHelperText('');
    setError(false)
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  }
  const goToDashboard=()=>{
    localStorage.setItem('username',state.user)
    localStorage.setItem('usercode',usercode)
    if(state.user === '' || state.user === undefined){
      setHelperText('Please select an user type.');
      setError(true);
    }else if(usercode === '' || usercode === undefined){
      setUserHelperText('Please type code provided to you');
      setUserError(true)
    }else if(usercode.length <6){
      setUserHelperText('Please type a valid code');
      setUserError(true)
    }else{
      setUserHelperText('');
      setUserError(false)
      fetch(config.apiEndpoint +'/authenticateuser/'+state.user+'/'+usercode,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
         }).then((response) => response.json())
         .then((responseJson) => {
          if(responseJson.volunteerdata.length>0){
            if(state.user === 'volunteer'){
              props.history.push({pathname: config.baseUrl+'dashboard'})
            }else{
              props.history.push({pathname: config.baseUrl+'ManagerDashboard'})
            }
          }else{
            setResponseHelperText('The code you provided not exist,please enter a valid code');
          }
        })
       .catch((error) => {
      });
    }
  }
  const [usercode, setUsercode] = React.useState('');
  const handleChange = (event) => {
    setUsercode(event.target.value.toLowerCase());
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
          <FormControl variant="outlined" className={classes.form} error={error}>
              <InputLabel htmlFor="outlined-age-native-simple">User Type</InputLabel>
              <Select
                native
                value={state.user}
                required
                fullWidth
                onChange={handleUserTypeChange}
                label="User Type"
                inputProps={{
                  name: 'user',
                  id: 'outlined-age-native-simple',
                 }}
                >
                <option aria-label="None" value="" />
                <option value={"manager"}>Manager</option>
                <option value={"volunteer"}>Teacher</option>
              </Select>
              <FormHelperText className={classes.helper}>{helperText}</FormHelperText>
          </FormControl>
          <FormControl  className={classes.form}  error={usererror}>
            <TextField
              autoCapitalize="none" 
              error={usererror}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="user code"
              label="User Code"
              type="text"
              id="usercode"
              value={usercode}
              onChange={handleChange}
              autoComplete="current-password"
            />
             <FormHelperText className={classes.helper}>{userhelperText}</FormHelperText>
            </FormControl>
            
       
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={goToDashboard}
              >
                Sign In
              </Button>
              <FormHelperText style={{color:"red",fontSize:"16px"}}>{responsehelperText}</FormHelperText>
            {/* </FormControl> */}
          
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
