
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { signupUser} from "../redux/slice/userSlice";
// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const INFORMATION=  {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        autoComplete: "new-password"
    },
    firstName: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    sex: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
}
const SignUp=()=> {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let value={}
        for (const key in INFORMATION){
            console.log(key)
            value[key]=data.get(key)
        }
        console.log(value)
        dispatch(signupUser(value))
            .unwrap()
            .then(()=>{
                navigate('/');
                window.location.reload();
            }).catch((error)=>{
                console.log('Login error:',error)

        })
    };
    return (
        <ThemeProvider theme={defaultTheme}>
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
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Đăng ký vào hệ thống
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {Object.entries(INFORMATION).map((item)=>{                        
                        return <TextField
                            margin="normal"
                            required={item[1].required}
                            fullWidth
                            id={item[0]}
                            label={item[0].charAt(0).toUpperCase() + item[0].slice(1)}
                            name={item[0]}
                            type={item[0]}
                            autoComplete={item[1].autoComplete||item[0]}
                            autoFocus
                        /> 
                    })}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng ký
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export  default SignUp;