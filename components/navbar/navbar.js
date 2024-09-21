import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/nextjs"
import { AppBar, Box, Button, createTheme, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, ThemeProvider, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import * as React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import InfoIcon from '@mui/icons-material/Info';
import { Image, Info } from "@mui/icons-material";

export default function NavBar(){

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#23d5ab',
      },
    },
  });

    const [open, setOpen] = React.useState(false);
    
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
    
    const { isLoaded, isSignedIn, user } = useUser();

    const [userName, setUsername] = React.useState("");


    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          <ListItem key={"AStar Flashcards"} disablePadding>
            <ListItemButton href="/">
              <ListItemIcon>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText primary={"AStar Flashcards"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Create Flashcards"} disablePadding>
            <ListItemButton href="/generate">
              <ListItemIcon>
                <CreateIcon></CreateIcon>
              </ListItemIcon>
              <ListItemText primary={"Create"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Load Flashcards"} disablePadding>
            <ListItemButton href="/flashcards">
              <ListItemIcon>
                <SortIcon></SortIcon>
              </ListItemIcon>
              <ListItemText primary={"Load"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"About"} disablePadding>
            <ListItemButton href="/about">
              <ListItemIcon>
                <Info></Info>
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Stack
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
          padding={4}
        >
          <SignedIn>
            
            <UserButton />
          </SignedIn>
          <Typography
            fontSize={20}
          >
            {isLoaded && isSignedIn && user.fullName}
          </Typography>
        </Stack>
      </Box>
    );

    const EmptyDrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <Stack
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100"}
        >
          <SignedOut>
            <Button color="inherit" href="/sign-in" 
              size="20px"
            >
              Login
            </Button>
            <Button color="inherit" href="/sign-up"
              size="20px"
            >
              Sign Up
            </Button>
          </SignedOut>
        </Stack>
      </Box>
    );

    if (!isLoaded || !isSignedIn){
      console.log("HIHIHII")
      return <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color={"secondary"}>
          <Toolbar
          style={
            {
              width: "100%",
              backgroundColor: "#23d5ab",
              color: "black"
            }
          }
          >
            <Link href={"/"} style={{ flexGrow: 1 }}>
              <Typography variant="h6">
                AStar Flashcard
              </Typography>
            </Link>
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
        <Drawer
              open={open} onClose={toggleDrawer(false)}
            >
              {EmptyDrawerList}
        </Drawer>
      </ThemeProvider>;
    }

    return <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color={"secondary"}>
        <Toolbar
          style={
            {
              width: "100%",
              backgroundColor: "#23d5ab",
              color: "black"
            }
          }
          
        >
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ 
                mr: 2 
              }}
              onClick={toggleDrawer(true)}
            >
            <MenuIcon>
            </MenuIcon>
          </IconButton>
          <Link href={"/"} style={{ flexGrow: 1 }}>
            <Typography variant="h6">
              AStar Flashcard
            </Typography>
          </Link>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Drawer
            open={open} onClose={toggleDrawer(false)}
          >
            {DrawerList}
      </Drawer>
      </ThemeProvider>;
}