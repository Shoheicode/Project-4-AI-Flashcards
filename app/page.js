"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import "./typewrite.css"
import DevicesIcon from "@mui/icons-material/Devices";
import TextsmsIcon from "@mui/icons-material/Textsms";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignIn } from "@clerk/nextjs";
import Head from "next/head";
import App from "next/app";
import PaidTierCard from "@/components/paidTierCard/paidTierCard";
import InfoCard from "@/components/infoCard/infoCard";
import Link from "next/link";

import NavBar from "@/components/navbar/navbar";
import { Padding } from "@mui/icons-material";

export default function Home() {
  const styleBox = {
    background: "rgb(35,150,255);",
    background:
      "radial-gradient(circle, rgba(35,150,255,1) 0%, rgba(194,240,255,1) 87%, rgba(229,255,104,1) 100%);",
  };

  return (
    <Box sx={styleBox} minHeight={"120vh"}>
      <Head>
        <title>Flashcard Study Tool</title>
        <meta name="description" content="Flashcard Study Tool" />
      </Head>

      <NavBar />

      <Box
        minWidth="lg"
        margin={0}
      >
        <Box 
          width={"100%"}
          height={"100vh"}
          sx={{ textAlign: "center" }}
          display={"flex"}
          justifyContent={"center"}
          bgcolor={"black"}  
          color={"white"}
          margin={"0px"}
          padding={10}
        >
            <Typography variant="h2" component="h1" gutterBottom id="text">
              Welcome to Team AStar <br></br>Flashcard
            </Typography>
          <Typography variant="h5" component="h2" gutterBottom className="apply">
            The easiest way to create flashcards from your text.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
            href="/generate"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ mt: 2 }}
            href="/about"
          >
            Learn More
          </Button>
        </Box>

        <Box 
          // sx={{ my: 6 }}
          padding={10}  
          bgcolor={"darkblue"}
          color={"white"}
          height={"100vh"}
        >
          <Typography variant="h2" component="h2" gutterBottom className="apply">
            Features
          </Typography>
          <Grid container spacing={4}>
            {/* Feature items */}
            <InfoCard
              
              icon={<TextsmsIcon />}
              title="Text to Cards in Seconds"
              subtitle="Transform your notes with just a few keystrokes"
            />
            <InfoCard
              icon={<DevicesIcon />}
              title="Easy Access"
              subtitle="Flashcards are accessible anytime, anywhere."
            />
            <InfoCard
              icon={<AutoAwesomeIcon />}
              title="Harness Artificial Intelligence"
              subtitle="Watch AI generate flashcards in seconds"
            />
          </Grid>
        </Box>

        <Box sx={{textAlign: "center" }}
          padding={10}
          bgcolor={"blue"}
        >
          <Typography variant="h3" component="h2" gutterBottom color={"white"} className="apply">
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Pricing plans */}
            {/* Could use the getPricingPlans util to dynamically make PaidTierCards instead of hard-coding them */}
            <PaidTierCard
              bgcolor="silver"
              tierName="Silver"
              price="$5 / month"
              description="Access to basic flashcard features and limited storage"
            />

            <PaidTierCard
              bgcolor="gold"
              tierName="Gold"
              price="$10 / month"
              description="Access to more premium features like AI Specific help"
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
