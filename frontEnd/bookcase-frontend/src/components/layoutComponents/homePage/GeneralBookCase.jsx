import React from 'react';
import { Typography, Box,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
export default function GeneralBookCase({books}) {

  const handleAddToPersonalList = (book) => {
   
};
  return (
    <Box>
        <Typography variant="h4" marginBlockEnd={5}>Welcome to BookCase</Typography>

        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Synopsis</TableCell>
                    <TableCell>Add</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {books.length > 0 ? (
                    books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.genre}</TableCell>
                            <TableCell>{book.synopsis}</TableCell>
                            <TableCell>
                                <Button
                                    color="primary"
                                    onClick={() => handleAddToPersonalList(book)}
                                >
                                    + Add to my list
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} align="center">
                            No books available
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        </TableContainer>
   </Box> 
  );
}