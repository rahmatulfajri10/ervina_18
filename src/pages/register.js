import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// Abaikan kode di bawah ini
const theme = createTheme();
  
const Register = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        username: data.get('username'),
        pass: data.get('password'),
        email: data.get('email'),
      });

    // Tambahkan kode di bawah ini untuk mengambil data dari localstorage
    // 1. Lakukan Axios POST ke API Register pada backend di bawah ini
    // body yang digunakan adalah username, email, dan password
    // jika berhasil, redirect ke halaman login
    // jika gagal, tampilkan alert 'Register Gagal'
      const username = data.get('username')
      const password = data.get('password')
      const email = data.get('email')
      if (username!='' && password!='' && email!='') {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
          username: username,
          email   : email,
          password: password
        })
        .then(function (response) {
          console.log(response.data)
          if (response.data=='Data Ditambahkan ke Database') {
            alert(response.data)
            navigate('/login')
          } else {
            alert('Register Gagal \n'.concat(response.data)) 
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('Register Gagal')
        });
      } else {
        alert('Register Gagal')
      }

    }
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

export default Register