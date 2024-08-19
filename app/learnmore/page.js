'use client'

import NavBar from "@/components/navbar/navbar"
import { Box } from "@mui/material"

export default function learnMorePage(){
    const styleBox = {
        background: "rgb(35,150,255);",
        background: "radial-gradient(circle, rgba(35,150,255,1) 0%, rgba(194,240,255,1) 87%, rgba(229,255,104,1) 100%);"  
      }
    
      return (
        <Box
          sx={styleBox}
          minHeight={"120vh"}
        >
        </Box>
    )
}
