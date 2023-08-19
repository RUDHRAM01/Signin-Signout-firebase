import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { auth, provider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';



function SignIn() {
    const [config, setConfig] = useState({
        email: '',
        password: '',
    });
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           await createUserWithEmailAndPassword(auth, config.email, config.password);
        } catch (error) {
            console.log(error);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Grid container component="form" spacing={2} md={6} >
               
                <Grid item xs={12} sm={12}>
                    <Typography variant="h4" style={{ color: "black" }}>
                        Sign Up
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="email"
                        label="Email"
                        value={config.email}
                        type='email'
                        required
                        onChange={e => setConfig({ ...config, email: e.target.value })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="password"
                        label="Password"
                        type='password'
                        required
                        value={config.password}
                        onChange={e => setConfig({ ...config, password: e.target.value })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={handleSubmit} style={{ color: "white" }}>
                        Sign Up
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={handleGoogleSignIn} style={{ color: "white" }}>
                        SignIn with Google
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={handleSignOut} style={{ color: "white" }}>
                        Sign out
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignIn;
