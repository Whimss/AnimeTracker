import React, { useState } from 'react';
import {
  Button,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleProviderSignIn = async (provider) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.error('Email sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const buttonStyles = {
    backgroundColor: isRegistering ? '#FFCCCC' : '', // Conditional background color
    '&:hover': {
      backgroundColor: isRegistering ? '#FFB3B3' : '', // Slightly darker on hover
    },
  };

  // Conditional color for the header
  const headerColor = isRegistering ? '#FFCCCC' : 'primary';
  const registerTextColor = isRegistering ? '#FFCCCC' : 'primary';

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom color={headerColor}>
          {isRegistering ? 'Register' : 'Sign In'}
        </Typography>
        <Stack spacing={2}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => handleProviderSignIn(googleProvider)}
            disabled={loading}
            fullWidth
            sx={buttonStyles}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign in with Google'}
          </Button>

          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={() => handleProviderSignIn(githubProvider)}
            disabled={loading}
            fullWidth
            sx={buttonStyles}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign in with GitHub'}
          </Button>

          {/* Optional Facebook login */}
          {/* <Button
            variant="contained"
            startIcon={<FacebookIcon />}
            onClick={() => handleProviderSignIn(facebookProvider)}
            disabled={loading}
            fullWidth
            sx={buttonStyles}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign in with Facebook'}
          </Button> */}

          <form onSubmit={isRegistering ? handleEmailRegister : handleEmailSignIn}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={<EmailIcon />}
              sx={{ mt: 1, ...buttonStyles }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : isRegistering ? (
                'Register with Email'
              ) : (
                'Sign in with Email'
              )}
            </Button>
          </form>

          <Button variant="text" onClick={() => setIsRegistering(!isRegistering)} sx={{ color: registerTextColor }}>
            {isRegistering
              ? 'Already have an account? Sign In'
              : "Don't have an account? Register"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignInPage;
