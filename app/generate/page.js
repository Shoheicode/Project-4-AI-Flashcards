'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar,
  Stack,
} from '@mui/material'

import './text.css'

import { database } from "@/app/firebase";
import { collection, doc, getDoc, setDoc, addDoc, writeBatch } from 'firebase/firestore';
import { SignedOut, SignedIn, SignOutButton, useUser, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/navbar/navbar';

export default function Generate() {
  
  const { isLoaded, isSignedIn, user } = useUser()
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()
    
    if(isLoaded && !isSignedIn){
      router.push("/")
    }

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToNextSlide = () =>{
    console.log(currentIndex)
    setCurrentIndex(currentIndex === flashcards.length - 1 ? 0 : currentIndex+1);
  }

  const goToPrevSlide = () =>{
    console.log(currentIndex)
    setCurrentIndex(currentIndex === 0 ? flashcards.length-1 : currentIndex-1);
  }

  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const [flipped, setFlipped] = useState({})

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    try {
      const userDocRef = doc(collection(database, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(database)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })
  
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      handleCloseDialog()
      router.push('/flashcards')
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  } 

  const loadFlashCards = async ()=>{
    router.push('/flashcards')
    setSetName('')
  }


  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  /*
    HandleSubmit does the following:
        1. It checks if the input text is empty and shows an alert if it is.
        2. It sends a POST request to our `/api/generate` endpoint with the input text.
        3. If the response is successful, it updates the `flashcards` state with the generated data.
        4. If an error occurs, it logs the error and shows an alert to the user.
  */
  const handleSubmit = async () => {
  if (!text.trim()) {
    alert('Please enter some text to generate flashcards.')
    return
  }

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: text,
    })

    if (!response.ok) {
      throw new Error('Failed to generate flashcards')
    }

    const data = await response.json()
    setFlashcards(data)
    
  } catch (error) {
    console.error('Error generating flashcards:', error)
    alert('An error occurred while generating flashcards. Please try again.')
  }
}
const styleBox = {
  background: "rgb(30,0,255);",
  background: "radial-gradient(circle, rgba(30,0,255,1) 0%, rgba(0,0,0,1) 100%);"
}

return (
    <Box
      className="moving-background-flashcard"
      minHeight={"120vh"}
    >
      <NavBar />
      <Container maxWidth="md">
        <Box minHeight={"90vh"}>
          <Stack 
            sx={{ my: 4 }} 
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
          >
            <Typography variant="h4" component="h1" gutterBottom id='generateText'>
              Generate Flashcards
            </Typography>
            <Box
              className='textArea'
              width={"100%"}
              padding={2}
            >
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter text"
              fullWidth
              multiline
              rows={4}
              variant="filled"
              sx={{ mb: 2 }}
            />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                sx={{ 
                  mt: 2, 
                  mr: 2,
                  color: "black",
                  bgcolor: "#23d5ab",
                }}
                className="buttonC"
              >
                Generate Flashcards
              </Button>
            </Box>
          </Stack>

            {flashcards.length > 0 && (<Box>
              <Stack gap={3}>
                <Card>
                    <CardActionArea onClick={() => handleCardClick(currentIndex)}>
                      <CardContent>
                        <Box sx={{ /* Styling for flip animation */ 
                          perspective: '1000px',
                          '& > div' :{
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            transform: flipped[currentIndex] 
                              ? 'rotateY(180deg)' 
                              : 'rotate',
                          },
                          '& > div > div' :{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing:'border-box'
                          },
                          '& > div > div:nth-of-type(2)' :{
                            transform: 'rotateY(180deg)',
                          }
                        }}>
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcards[currentIndex].front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcards[currentIndex].back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent> 
                  </CardActionArea>
                </Card>
                <Box 
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"space-around"}
                >
                  <Button 
                    variant='contained'
                    onClick={goToPrevSlide}
                    sx={{ 
                      mt: 2, 
                      mr: 2,
                      color: "black",
                      bgcolor: "#23d5ab",
                    }}
                    className="buttonC"
                  >
                    Prev
                  </Button>
                  <Typography>
                    {currentIndex + 1}/{flashcards.length}
                  </Typography>
                  <Button
                    variant='contained'
                    onClick={goToNextSlide}
                    sx={{ 
                      mt: 2, 
                      mr: 2,
                      color: "black",
                      bgcolor: "#2F6542",
                    }}
                    className="buttonC"
                  >
                    Next
                  </Button>
                </Box>
              </Stack>
            </Box>
            )}
              {flashcards.length > 0 && (
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" color="primary" onClick={handleOpenDialog}
                        className="buttonC"
                      >
                        Save Flashcards
                      </Button>
                  </Box>
              )}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Save Flashcard Set</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Please enter a name for your flashcard set.
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    label="Set Name"
                    type="text"
                    fullWidth
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={saveFlashcards} color="primary">
                    Save
                    </Button>
                </DialogActions>
            </Dialog>            
          </Box>
      </Container>
    </Box>
  )
}