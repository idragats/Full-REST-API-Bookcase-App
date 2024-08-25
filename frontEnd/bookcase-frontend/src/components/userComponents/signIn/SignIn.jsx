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
    width: '100px',
});

export default function SignIn({ setVisibleComponent, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   // In your SignIn component
   const handleSubmit = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/users/signin/', { email, password });
        if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('token', token); 
            setUser(response.data);
            setVisibleComponent('GeneralBookCase');
        }
    } catch (error) {
        console.error('Sign-in error:', error.response?.data?.detail || error.message);
    }
};



    return (
        <FormGroupStyled>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                />
            </FormControl>

            <FormControl>
                <ButtonStyled variant="contained" color="primary" onClick={handleSubmit}>
                    Sign In
                </ButtonStyled>
            </FormControl>

            <FormControl>
                <Typography>
                    Don't have an account?
                    <Button onClick={() => setVisibleComponent('SignUp')} color="primary">
                        Sign Up
                    </Button>
                </Typography>
            </FormControl>
        </FormGroupStyled>
    );
}
