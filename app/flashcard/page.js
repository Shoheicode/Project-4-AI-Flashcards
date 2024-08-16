'use client'

import { useUser } from "@clerk/nextjs"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { database } from "../firebase"
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    
    useEffect(() => {
        async function getFlashcard() {
          if (!search || !user) return
          
          const documentReference = doc(collection(doc(collection(database, 'users'), user.id), "flashcardSets"), search)
          const docy = await getDoc(documentReference)
          
          const flashcds = docy.data().flashcards
          setFlashcards(flashcds)
        }
        getFlashcard()
      }, [user, search])

      const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id]: !prev[id],
        }))
      }

      return (
        <Container maxWidth="md">
            <Typography variant="h1">{search}</Typography>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
                
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
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
                          transform: flipped[index] 
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
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )

}