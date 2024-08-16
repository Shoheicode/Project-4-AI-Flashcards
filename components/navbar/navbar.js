import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { AppBar, Button, createTheme, ThemeProvider, Toolbar, Typography } from "@mui/material"
import Link from "next/link"

export default function NavBar(){

    const customTheme = createTheme({
        palette: {
          secondary: {
            main: "#F9F49E",
            contrastText: "#3690FF"
          }
        }
    });

    

    return <ThemeProvider theme={customTheme}>
        <AppBar position="static" color={"secondary"}>
        <Toolbar>
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
      </ThemeProvider>;
}