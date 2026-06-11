import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../services/authetication/AutheticationApi';
import { logInDemo } from '../../services/authetication/AutheticationSlice';
import BrandLogo from '../../components/BrandLogo';
import "./login.css";

const DEMO_EMAIL = "demo@voltgrid.local";
const DEMO_PASSWORD = "demo123";

const Login = () => {
  // hook
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  // use State
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false); // Change error state to boolean

  // function to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordReset = () => {
    setPassword("")
    setError(false)
  }

  // function to handle login
  const handleLogin = async () => {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      dispatch(logInDemo());
      navigate("/actual-status");
      return;
    }

    if (!executeRecaptcha) {
      setError(true);
      return;
    }

    const recaptchaToken = await executeRecaptcha("login_action");
    const data = {
      email,
      password,
      recaptchaToken
    }
    
    dispatch(LoginUser(data)).then(res => {

      if (res.payload?.data?.status == false) {
        setError(true)
      } else {
        switch (res.payload?.data.data.role) {
          case "user":
            case "operator":
              navigate("/map-view");
              break;
            case "driver":
              navigate("/drivers")
              break;
            default:
              navigate("/login");
        }
      }
    })
  };

  // function to handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(false); // Reset error state on password change
  };

  return (
    <Stack
      className="login-page"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box className="login-shell">
        <Box className="login-brand">
          <BrandLogo inverted />
          <Typography variant='h3' component={"h1"} className='heading_logo'>
            Welcome back
          </Typography>
          <Typography className="login-copy">
            Monitor charging stations, E-Packs, operations, and live fleet data from one console.
          </Typography>
          <Box className="login-metrics">
            <span><strong>128</strong>E-Packs</span>
            <span><strong>42</strong>Stations</span>
            <span><strong>98%</strong>Uptime</span>
          </Box>
        </Box>
      <form className="login-form">
        <Typography variant='h4' component={"h2"} className='login-form__title'>
          Log in
        </Typography>
        
        <Box>
          <InputLabel className='lable' htmlFor="email">Email</InputLabel>
          <TextField
            id='email'
            type="email"
            size='small'
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box >
          <InputLabel className='lable' htmlFor="password">Password</InputLabel>
          <TextField
            size='small'
            id='password'
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={handlePasswordChange} // Call handlePasswordChange on password change
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {error ?
                    <IconButton onClick={handlePasswordReset} edge="end">
                      <CancelIcon sx={{ color: (theme => theme?.palette?.error?.main) }} />
                    </IconButton> :
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>}

                </InputAdornment>
              ),
              style: { borderColor: error ? 'red' : 'inherit' },
            }}
            error={error}
            helperText={error ? 'Incorrect password. Please try again.' : ''}
          />
        </Box>
        <InputLabel className='lable' sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("forget-password")}
        >
          Forget Password?</InputLabel>
        <Box sx={{ paddingTop: "1rem" }}>
        </Box>
        <Box sx={{ paddingTop: "2rem" }}>
          <Button variant='contained' fullWidth onClick={handleLogin} sx={{
            background: "#2E7D5B", color: "#fff", py: 1.2, "&:hover": {
              background: "#14532D",
              color: "#fff"
            }
          }}>
            Log in
          </Button>
        </Box>
      </form>
      </Box>
    </Stack>
  );
};

export default Login;
