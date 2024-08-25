import React, { useState } from 'react';
import { FormGroup, FormControl, TextField, Button, styled } from '@mui/material';
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
    width: '120px',
});

export default function AddBook({ setBooks, setVisibleComponent }) {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        synopsis: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewBook({ ...newBook, [id]: value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/books/', newBook, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setBooks((prevBooks) => [...prevBooks, response.data]); 
            setNewBook({ title: '', author: '', genre: '', synopsis: '' });
            setError(null);
            setVisibleComponent('GeneralBookCase');
        } catch (error) {
            setError('Error adding book: ' + (error.response?.data?.detail || error.message));
            console.error('Error adding book:', error);
        }
    };
    
    return (
        <FormGroupStyled>
            <FormControl>
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={newBook.title}
                    onChange={handleInputChange}
                    required
                />
            </FormControl>

            <FormControl>
                <TextField
                    id="author"
                    label="Author"
                    variant="outlined"
                    value={newBook.author}
                    onChange={handleInputChange}
                    required
                />
            </FormControl>

            <FormControl>
                <TextField
                    id="genre"
                    label="Genre"
                    variant="outlined"
                    value={newBook.genre}
                    onChange={handleInputChange}
                    required
                />
            </FormControl>

            <FormControl>
                <TextField
                    id="synopsis"
                    label="Synopsis"
                    multiline
                    rows={4}
                    variant="standard"
                    value={newBook.synopsis}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl>
                <ButtonStyled variant="contained" color="primary" onClick={handleSubmit}>
                    + Add Book
                </ButtonStyled>
            </FormControl>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </FormGroupStyled>
    );
}
