"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Divider,
} from '@mui/material'
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar/navbar"
import './flashcard.css'
import './countdowntimer.css'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0);
    const [time, setTime] = useState(30);
    const [running, setRunning] = useState(false)

    const startTimer = ()=>{
      setRunning(true);
    }

    const resetTimer = ()=>{
      setRunning(false);
      setTime(30)
    }

    useEffect(() => {
      let interval;
  
      if (running && time > 0) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
      } else if (time === 0) {
        setRunning(false);
      }
  
      return () => clearInterval(interval);
    }, [running, time]);

    const router = useRouter();
    

    if(isLoaded && !isSignedIn){
      router.push("/")
    }
    
    const goToNextSlide = () =>{
      console.log(currentIndex)
      setFlipped((prev) => ({
        ...prev,
        [currentIndex]: false,
      }))
      setCurrentIndex(currentIndex === flashcards.length - 1 ? 0 : currentIndex+1);
    }

    const goToPrevSlide = () =>{
      console.log(currentIndex)
      setFlipped((prev) => ({
        ...prev,
        [currentIndex]: false,
      }))
      setCurrentIndex(currentIndex === 0 ? flashcards.length-1 : currentIndex-1);
    }

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    const goToQuiz = () => {
      router.push(`/quiz?id=${search}`)
    }
    
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
      const styleBox = {
        // background: "rgb(30,0,255);",
        // background: "radial-gradient(circle, rgba(30,0,255,1) 0%, rgba(0,0,0,1) 100%);"  
        background: "#8349B7"
      }
    
      return (
        <Box
          sx={styleBox}
          minHeight={"120vh"}
        >
          <NavBar />
          <Stack
              direction={"row"}
              paddingLeft={5}
              paddingRight={5}
            >
          <Container 
            maxWidth="md"
            sx={
              {
                padding: 10
              }
            }
          >
              <Stack
                gap={4}
              >
                <Typography variant="h1" className="startText" color={"white"}textAlign={"center"}>{search}</Typography>
                <Divider/>
              
              {flashcards.length > 0 && (<Box>
                <Stack gap={5}>
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
                      sx={
                        {
                          color: "black",
                        bgcolor: "#23d5ab",
                        }
                      }
                      className="buttonC"
                    >
                      Prev
                    </Button>
                    <Typography color={"white"}>
                      {currentIndex + 1}/{flashcards.length}
                    </Typography>
                    <Button
                      //style={rightArrowStyles}
                      variant='contained'
                      onClick={goToNextSlide}
                      className="buttonC"

                      sx={{
                        color: "black",
                        bgcolor: "#23d5ab",
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Stack>
              </Box>
              )}
              </Stack>
          </Container>
          <Stack
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={5}
          >
            <div className="countdown-timer">
              <p className="timer-display">{time} seconds</p>
              <div className="button-container">
                <Button onClick={resetTimer} className="timer-button buttonC">
                  Restart
                </Button>
                <Button onClick={startTimer} className="timer-button buttonC">
                  Start
                </Button>
              </div>
            </div>

            <Button onClick={goToQuiz} className="buttonC">
              Quiz
            </Button>
          </Stack>
          </Stack>
        </Box>
      )

}
