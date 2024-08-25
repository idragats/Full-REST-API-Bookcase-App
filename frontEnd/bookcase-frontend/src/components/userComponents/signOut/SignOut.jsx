import React from "react";
import Typography from '@mui/material/Typography';
import { 
    FormGroup,
    FormControl,
    Button, 
    styled,
    Box,
} from "@mui/material";





const FormGroupStyled = styled(FormGroup)(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(3.5),
    paddingTop: theme.spacing(5),
    boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
    gap: theme.spacing(5),
}));

const ButtonStyled = styled(Button)({
    margin: 0,   
    padding: 8,
    width: '130px',
    gap: '10px'
})

export default function SignOut({ setVisibleComponent }) {

    const handleSignOut =  () => {

    };

    return (
        <FormGroupStyled>

            <FormControl> 
                <Typography>Are you sure you want to sign out?</Typography>
            </FormControl >  

            <FormControl>
            <Box display="flex" gap={2}>
                <ButtonStyled variant="contained" color="primary" onClick={handleSignOut}>Yes</ButtonStyled>
                <ButtonStyled variant="contained" color="secondary" onClick={() => setVisibleComponent('GeneralBookCase')}>No</ButtonStyled>
            </Box>
            </FormControl>   

        </FormGroupStyled>
    );
}
