import { Box, Card, CardActionArea, CardContent, CardMedia, CssBaseline, Typography,useMediaQuery } from '@mui/material'
import React, { Component } from 'react'
import createimg  from '../assets/createimg.jpg';
import myquizimg from '../assets/myquizimg.png'
import playquiz from '../assets/playquiz.jpg'
import { makeStyles, useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    box:{
        display:'flex',justifyContent:'center',alignItems:'center',gap:15,marginTop:'15%', justifySelf:'center',
        [theme.breakpoints.down("md")] : {
            flexDirection:'column'
            },
    },
    card: {
      maxWidth: 350,
      [theme.breakpoints.down("md")] : {
      maxWidth: '95%'
      }
    }
  }));

export default function Home() {
    const classes=useStyles();
    const theme=useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
    <CssBaseline/>
    <Box className={classes.box}>
    <Card className={classes.card} component={Link} to={'/CreateNewQuiz'} style={{textTransform:'none'}}>
        <CardActionArea >
        <CardMedia
        component={'img'}
        height='225'
        src={createimg}
        ></CardMedia>
        <CardContent>
            <Typography variant='h6' style={{textTransform:'none'}}>
                Create New Quiz
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    <Card className={classes.card} component={Link} to={'myquizes'}>
        <CardActionArea>
        <CardMedia
        component={'img'}
        height='225'
        src={myquizimg}
        ></CardMedia>
        <CardContent>
            <Typography variant='h6'>
                My Quiz
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    <Card className={classes.card} component={Link} to={'playquiz'}>
        <CardActionArea>
        <CardMedia
        component={'img'}
        height='225'
        src={playquiz}
        ></CardMedia>
        <CardContent>
            <Typography variant='h6'>
                Play Quiz
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    </Box>
    </>
  )
}
