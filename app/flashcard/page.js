// import { useUser } from "@clerk/nextjs"
// import { collection, doc, getDoc } from "firebase/firestore"
// import { useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { database } from "../firebase"
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions
// } from '@mui/material'

// export default function Flashcard() {
//     const { isLoaded, isSignedIn, user } = useUser()
//     const [flashcards, setFlashcards] = useState([])
//     const [flipped, setFlipped] = useState({})
    
//     // const searchParams = useSearchParams()
//     // const search = searchParams.get('id')
    
//     useEffect(() => {
//         async function getFlashcard() {
//           if (!search || !user) return
      
//           const colRef = collection(doc(collection(database, 'users'), user.id), search)
//           const docs = await getDocs(colRef)
//           const flashcards = []
//           docs.forEach((doc) => {
//             flashcards.push({ id: doc.id, ...doc.data() })
//           })
//           setFlashcards(flashcards)
//         }
//         getFlashcard()
//       }, [search, user])

//       const handleCardClick = (id) => {
//         setFlipped((prev) => ({
//           ...prev,
//           [id]: !prev[id],
//         }))
//       }

//       return (
//         <Container maxWidth="md">
//           <Grid container spacing={3} sx={{ mt: 4 }}>
//             {flashcards.map((flashcard) => (
//               <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
//                 <Card>
//                   <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
//                     <CardContent>
//                       <Box sx={{ /* Styling for flip animation */ 
//                         perspective: '1000px',
//                         '& > div' :{
//                           transition: 'transform 0.6s',
//                           transformStyle: 'preserve-3d',
//                           position: 'relative',
//                           width: '100%',
//                           height: '200px',
//                           boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                           transform: flipped[index] 
//                             ? 'rotateY(180deg)' 
//                             : 'rotate',
//                         },
//                         '& > div > div' :{
//                           position: 'absolute',
//                           width: '100%',
//                           height: '100%',
//                           backfaceVisibility: 'hidden',
//                           display: 'flex',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           padding: 2,
//                           boxSizing:'border-box'
//                         },
//                         '& > div > div:nth-of-type(2)' :{
//                           transform: 'rotateY(180 deg)',
//                         }
//                       }}>
//                         <div>
//                           <div>
//                             <Typography variant="h5" component="div">
//                               {flashcard.front}
//                             </Typography>
//                           </div>
//                           <div>
//                             <Typography variant="h5" component="div">
//                               {flashcard.back}
//                             </Typography>
//                           </div>
//                         </div>
//                       </Box>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       )

// }