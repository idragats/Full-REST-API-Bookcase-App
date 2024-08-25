import React, { useState } from 'react';
import { Typography, FormGroup, FormControl, InputLabel, Input, Button, styled } from '@mui/material';
import axios from 'axios';

const FormGroupStyled = styled(FormGroup)({
    padding: 20,
    paddingTop: 40,
    boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
    gap: '40px',
});

const ButtonStyled = styled(Button)({
    margin: 0,
    padding: 8,
    align: 'left',
    width: '100px'
});

export default function SignUp({ setUser, setVisibleComponent }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        if (!email || !username || !password || !confirmPassword) {
            setError("Please fill out all required fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Sign up the user
            const response = await axios.post('http://127.0.0.1:8000/api/users/signup/', {
                email,
                username,
                password,
                confirm_password: confirmPassword,
            });

            if (response.status === 201) {
                // Auto sign-in after sign-up
                const signInResponse = await axios.post('http://127.0.0.1:8000/api/users/signin/', {
                    email,
                    password,
                });

                if (signInResponse.status === 200) {
                    const userData = signInResponse.data;
                    setUser(userData); 
                    localStorage.setItem('user', JSON.stringify(userData)); 
                    setVisibleComponent('GeneralBookCase'); 
                }
            }
        } catch (error) {
            console.error("Error during sign-up:", error.response || error.message);
            setError("Error during sign-up: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <FormGroupStyled>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <Input id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required />
            </FormControl>

            <FormControl>
                <ButtonStyled variant="contained" color="primary" onClick={handleSubmit}>Sign Up</ButtonStyled>
            </FormControl>

            <FormControl>
                <Typography>
                    Already have an account?{' '}
                    <Button onClick={() => setVisibleComponent('SignIn')} color="primary">
                        Sign In
                    </Button>
                </Typography>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </FormControl>
        </FormGroupStyled>
    );
}
