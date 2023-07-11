import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import {Tabs, Tab, Typography} from '@mui/material'
import { Box, Toolbar,Stack, useMediaQuery, useTheme} from '@mui/material'
import logo from '../assets/logo1.png';
import DrawerComponent from './DrawerComponent';
import { Link } from "react-router-dom";

function LinkTab(props) {
    return (
      <Tab
        component="Link"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

export default function Navbar({name}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [activeTab,setactiveTab]=useState('home');
    const handelActiveTab=(event,newValue) =>{
        setactiveTab(newValue);
    }
  return (
    <>
    <CssBaseline/>
    <AppBar component='nav' color='secondary' position='sticky' >
        <Toolbar sx={{display:'flex', justifyContent:'space-between',alignItems:'center' }}>
        <Box component='img' sx={{width:110,height:30}} src={logo} alt='logo'/>
        {isMobile ?(<DrawerComponent/>):(<Stack direction={'row'} spacing={2}>
            <Tabs value={activeTab} onChange={handelActiveTab}>
            <Tab value='home' href="/" style={{textTransform:'none',fontWeight:700}} component={Link} to={"/"} label='Home'></Tab>
            <Tab value='myquizes' style={{textTransform:'none',fontWeight:700}} component={Link} to={"/myquizes"} href="/myquizes" label='My Quizes'></Tab>
            <Tab value='playquiz' style={{textTransform:'none',fontWeight:700}} component={Link} to={"/playquiz"} label='Play Quiz'></Tab>
            <Typography variant='h6' style={{textTransform:'none',fontWeight:500,marginTop:8}}>{name}</Typography>
            </Tabs>
        </Stack>)}
        
        </Toolbar>
    </AppBar>
    </>
  )
}
