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
import {changePassword, loginUser} from "../../redux/slices/userSlice";
import Layout from "../../components/Layout";
import { ThunkDispatch } from '@reduxjs/toolkit';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export  default function ChangePassword(){
    const defaultTheme = createTheme();
    const dispatch=useDispatch<ThunkDispatch<any, any, any>>();
    const navigate=useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('secondPassword')!==data.get('newPassword')){
            alert("Thông tin không nhât quán, mời bạn nhập lại")
        }else{
            const value={
                email: data.get('email'),
                oldPassword:data.get('oldPassword'),
                newPassword:data.get('newPassword'),
            }
            dispatch(changePassword(value))
                .unwrap()
                .then(()=>{
                    navigate("/login");
                }).catch((error)=>{
                console.log('Login error:',error)
            })

        }

    };

    const content=(

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Đổi mật khẩu
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="oldPassword"
                            label="mật khẩu cũ"
                            type="password"
                            id="oldPassword"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="nhập mật khẩu mới"
                            type="password"
                            id="newPassword"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="secondPassword"
                            label="nhập lại"
                            type="password"
                            id="secondPassword"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đổi mật khẩu
                        </Button>
                        <Grid container>
                        </Grid>
                    </Box>
                </Box>

    );
    return(
        content
    )
}
