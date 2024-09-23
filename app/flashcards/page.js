'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material'

import './flashcards.css'

import { database } from "@/app/firebase";
import { collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import NavBar from '@/components/navbar/navbar';

export default function Flashcard() {
    //gets the user
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
    
    if(isLoaded && !isSignedIn){
      router.push("/")
    }
  
    useEffect(() => {
        async function getFlashcards() {
          //If there is no user, end the function
          if (!user) return
          const docRef = doc(collection(database, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcardSets || []
            setFlashcards(collections)
            console.log(collections)
            console.log(collections.length)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
      }, [user])

      if (!isLoaded || !isSignedIn){
        console.log("HIHIHII")
        return <></>
      }

      const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
      }
      const styleBox = {
        background: "rgb(35,150,255);",
        background: "radial-gradient(circle, rgba(35,150,255,1) 0%, rgba(194,240,255,1) 87%, rgba(229,255,104,1) 100%);"  
      }
    
      return (
        <Box
          sx={styleBox}
          minHeight={"120vh"}
        >
           <NavBar />
          <Container maxWidth="md">
            <Box 
              width={"100%"}
              minHeight={"100vh"}
              padding={10}
            >
              <Typography variant="h4" component="h1" gutterBottom >
                Cards
              </Typography>

              <SplitButton/>

              <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {flashcard.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      ) 
}

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}