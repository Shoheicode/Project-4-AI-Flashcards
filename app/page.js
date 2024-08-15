'use client'

import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import getStripe from "./utils/get-stripe";
import { SignedIn, SignedOut, UserButton, SignIn } from "@clerk/nextjs";
import Head from "next/head";
import App from "next/app";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard Study Tool</title>
        <meta name="description" content="Flashcard Study Tool" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Team AStar Flashcard
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{mt: 2}}>
          Learn More
        </Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          {/* Feature items */
          
          
          }
          <Grid item xs = {12} md={4}>
            <Typography variant="h6"> Esay Text Input</Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating
              flashcards has never been easier
            </Typography>
          </Grid>

          <Grid item xs = {12} md={4}>
            <Typography variant="h6"> Esay Access</Typography>
            <Typography>
              {' '}
              Access on any device anywhere!
            </Typography>
          </Grid>

          <Grid item xs = {12} md={4}>
            <Typography variant="h6"> Uses Artifical Intelligence</Typography>
            <Typography>
              {' '}
              Artifical Intelligence is common now and it makes the complex tasks of
              creating and manufacturing flashcards easy as 1,2,3
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h3" component="h2" gutterBottom>Pricing</Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Pricing plans */}
          <Grid item xs = {12} md={6}>
            <Box height={180} border={"2px solid black"} borderRadius={10} bgcolor={'silver'}>
              <Typography variant="h4">Silver</Typography>
              <Typography variant="h5">$5 / month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage
              </Typography>
              <Button variant="contained" color="primary">Choose Bronze</Button>
            </Box>
          </Grid>

          <Grid item xs = {12} md={6}>
            <Box height={180} border={"2px solid black"} borderRadius={10} bgcolor={'gold'}>
              <Typography variant="h4">Gold</Typography>
              <Typography variant="h5">$10 / month</Typography>
              <Typography>
              {' '}
              Access to more premium features like AI Specific help
              
              </Typography>
              <Button variant="contained" color="primary">Choose Silver</Button>
            </Box>
          </Grid>

          {/* <Grid item xs = {12} md={4}>
            <Box height={180} border={"2px solid black"} borderRadius={10} bgcolor={'gold'}>
              <Typography variant="h4">Gold</Typography>
              <Typography variant="h5">$15 / month</Typography>
              <Typography>
                {' '}
                you get a cool gold tag line and a bunch of other features
              </Typography>
              <Button variant="contained" color="primary">Choose Gold</Button>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
      
      {/* <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{textAlign: 'center', my: 4}}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <SignIn />
      </Box> */}
    </Container>
  );
}
