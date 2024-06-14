
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems from '../NotComponents/listItems';
import UserDropdown from "../NotComponents/UserDropdown";
import { Button } from 'react-bootstrap';
import Layout from '../components/Layout';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
        <img src={`${process.env.PUBLIC_URL}/landing_img.jpg`} style={{
            position:"absolute",
            left: 0, 
            right: 0, 
            top:0,
            bottom:0,
            width:"100%",
            height:"100%",
            }}/>
        <div style={{
            position:"absolute",
            left: 0, 
            right: 0, 
            top:0,
            bottom:0,
            marginLeft: "auto", 
            marginRight: "auto", 
            height:"100%",
            width:"100vw",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"row"
            }}>
                <div style={{flex:1,
                    backdropFilter:"blur(4px) opacity(0.4)",height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.5)",
                    display:"flex",
                    width:"50%",
                    boxSizing:"border-box",
                    padding:"5rem 10rem",
                    alignItems:"start",
                    justifyContent:"center",
                    flexDirection:"column",
                    }}>
                <h1 style={{
                    backgroundImage: "linear-gradient(to left, #FFA27F, #FFE8C5)",
                    color:"transparent",
                    backgroundClip:"text",
                    WebkitBackgroundClip:"text",
                    fontSize:"6rem",
                    textShadow: `2px 2px 4px rgba(179, 147, 211, 0.1),
                    3px 4px 4px rgba(179, 147, 211, 0.15),
                    4px 6px 4px rgba(179, 147, 211, 0.2),
                    5px 8px 4px rgab(179, 147, 211, 0.25)`
                }}>
                    Hệ thống quản lý chung cư Blue Moon
                </h1>
                {/* <Button 
                onClick={()=>{
                    navigate("/login")
                }}
                style={{
                    backgroundImage: "linear-gradient(to left, #FFA27F, #FFE8C5)",
                    color:"black",
                    outline:"none",
                    border:"none",
                    borderRadius:"20px",
                    marginTop:"2rem",
                    marginLeft:"0.5rem"
                }}>Truy cập</Button> */}
                </div>
                <div style={{flex:1}}>

                </div>
            </div>
    </div>
    );
}