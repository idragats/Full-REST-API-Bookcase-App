import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './sideBar/SideBar';
import SignIn from '../../userComponents/signIn/SignIn'; 
import SignUp from '../../userComponents/signUp/SignUp';
import SignOut from '../../userComponents/signOut/SignOut';
import GeneralBookCase from '../homePage/GeneralBookCase';
import PersonalBookCase from '../../bookComponents/personalBookCase/PersonalBookCase';
import AddBook from '../../bookComponents/addBook/AddBook';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [visibleComponent, setVisibleComponent] = useState('GeneralBookCase');
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

    const handleDrawerToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        setVisibleComponent('GeneralBookCase');
    };

    const handleDeleteBooks = (bookIds) => {
        setBooks((prevBooks) => prevBooks.filter(book => !bookIds.includes(book.id)));
    };

    const renderComponent = () => {
        switch (visibleComponent) {
            case 'GeneralBookCase':
                return (
                    <Box sx={{ 
                        position: 'fixed', 
                        top: '20%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '70%', 
                        backgroundColor: 'white', 
                        p: 2, 
                        zIndex: 1300 
                    }}>
                        <GeneralBookCase books={books} setVisibleComponent={setVisibleComponent} />
                    </Box>
                );
            case 'SignIn':
                return (
                    <Box sx={{ 
                        position: 'fixed', 
                        top: '40%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '50%', 
                        backgroundColor: 'white', 
                        p: 3, 
                        zIndex: 1300 
                    }}>
                        <SignIn setVisibleComponent={setVisibleComponent} setUser={setUser} />
                    </Box>
                );
            case 'SignUp':
                return (
                    <Box sx={{ 
                        position: 'fixed', 
                        top: '40%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '50%', 
                        backgroundColor: 'white', 
                        p: 3, 
                        zIndex: 1300 
                    }}>
                        <SignUp setUser={setUser} setVisibleComponent={setVisibleComponent} />
                    </Box>
                );
            case 'SignOut':
                return (
                    <Box sx={{ 
                        position: 'fixed', 
                        top: '40%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '50%', 
                        backgroundColor: 'white', 
                        p: 3, 
                        zIndex: 1300 
                    }}>
                        <SignOut setVisibleComponent={setVisibleComponent} onSignOut={handleSignOut} />
                    </Box>
                );
            case 'PersonalBookCase':
                return (
                    <Box sx={{ 
                        position: 'fixed', 
                        top: '20%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '70%', 
                        backgroundColor: 'white', 
                        p: 2, 
                        zIndex: 1300 
                    }}>
                        <PersonalBookCase books={books} onDeleteBooks={handleDeleteBooks} setVisibleComponent={setVisibleComponent} />
                    </Box>
                );
            case 'AddBook':
                return (
                    <Box sx={{ 
                        position: 'fixed', 
                        top: '40%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '50%', 
                        backgroundColor: 'white', 
                        p: 3, 
                        zIndex: 1300 
                    }}>
                        <AddBook setBooks={setBooks} setVisibleComponent={setVisibleComponent} />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{ marginRight: 5 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Button sx={{ fontSize: '1.2rem' }} color="inherit" onClick={() => setVisibleComponent('GeneralBookCase')}>BookCase</Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    {user ? (
                        <>
                            <Button color="inherit" onClick={handleSignOut}>Sign out</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => setVisibleComponent('SignUp')}>Sign up</Button>
                            <Button color="inherit" onClick={() => setVisibleComponent('SignIn')}>Sign in</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <SideBar open={open} handleDrawerClose={handleDrawerToggle} setVisibleComponent={setVisibleComponent} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {renderComponent()}
            </Box>
        </Box>
    );
}
