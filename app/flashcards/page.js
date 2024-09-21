'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  AppBar,
  Toolbar
} from '@mui/material'

import { database } from "@/app/firebase";
import { collection, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
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
              <Typography>
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