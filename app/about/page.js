"use client";
import About from "@/components/AboutPage/about";
import NavBar from "@/components/navbar/navbar";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, Fragment } from "react";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <Box>
        <NavBar />
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <About/>
      </Box>
    </Box>
  );
}