import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Box } from '@mui/material';

export default function PersonalBookCase({ books, onDeleteBooks }) {
    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheckboxChange = (bookId) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(bookId)
                ? prevSelectedIds.filter((id) => id !== bookId)
                : [...prevSelectedIds, bookId]
        );
    };

    const handleDelete = () => {
        if (typeof onDeleteBooks === 'function') {
            onDeleteBooks(selectedIds); 
            setSelectedIds([]);
        } else {
            console.error('onDeleteBooks is not a function');
        }
    };

    return (
        <Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                disabled={selectedIds.length === 0}
                style={{ marginBottom: '10px' }}
            >
                Delete Selected
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Select</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Synopsis</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(book.id)}
                                        onChange={() => handleCheckboxChange(book.id)}
                                    />
                                </TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>{book.synopsis}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
