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

import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

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
        // background: "rgb(35,150,255);",
        // background: "radial-gradient(circle, rgba(35,150,255,1) 0%, rgba(194,240,255,1) 87%, rgba(229,255,104,1) 100%);"  
        background: "rgb(40,43,42);"
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
              <Typography variant="h4" component="h1" gutterBottom 
                sx={{
                  color:"white",
                }}
              >
                Cards
              </Typography>

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