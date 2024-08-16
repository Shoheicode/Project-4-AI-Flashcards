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
} from '@mui/material'


import { database } from "@/app/firebase";
import { collection, doc, getDoc, setDoc, addDoc, writeBatch } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Generate() {
  //STYLE
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "black",
    zIndex: 1,
    cursor: "pointer",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "black",
    zIndex: 1,
    cursor: "pointer",
  };



  const { isLoaded, isSignedIn, user } = useUser()
  //const [flashcards, setFlashcards] = useState([])
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()

  const [currentIndex, setCurrentIndex] = useState(0);
  //const [fcards, setFCards] = useState([])
  
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

  return (
    <Container maxWidth="md">
      <Box minHeight={"90vh"}>
        <Box 
          sx={{ my: 4 }} 
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Generate Flashcards
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Box>

          {flashcards.length > 0 && (<Box>
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
                        {/* <Typography variant="h6">Front:</Typography>
                        <Typography>{flashcard.front}</Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                        <Typography>{flashcard.back}</Typography>*/}
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
              >
                Prev
              </Button>
              <Button
                //style={rightArrowStyles}
                variant='contained'
                onClick={goToNextSlide}
              >
                Next
              </Button>
            </Box>
          </Box>
          )}
          {flashcards.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
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
    
  )
}