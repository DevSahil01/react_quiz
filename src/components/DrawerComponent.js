import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import {
    Button,
  Drawer,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(()=>({
    
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <List>
         <ListItem onClick={() => setOpenDrawer(false)}>
            <Button component={Link} to={'/'}>
              Home
            </Button>
          </ListItem>
         <ListItem onClick={() => setOpenDrawer(false)}>
            <Button component={Link} to={'/myquizes'}>
              My Quizes
            </Button>
          </ListItem>
         <ListItem  onClick={() => setOpenDrawer(false)}>
            <Button component={Link} to={'/playquiz'}>
              Play Quiz
            </Button>
          </ListItem>
        
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
