import * as React from 'react';
import Textarea from '@mui/material/TextareaAutosize';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { IconButton, TextareaAutosize,Button, containerClasses } from '@mui/material';
import { Container ,Stack,Tooltip} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { createPdfFromHtml } from "./Logic";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
// import {html2canvas} from 'app/ext'                                   










function Notes (){
    const [newNotes , setNewNotes] = useState("")
    const [notes , setNotes] = useState("")
     function handleDownload (){
    //     const input = newNotes;
    //     html2canvas(input)
    //       .then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'JPEG', 0, 0);
    //         // pdf.output('dataurlnewwindow');
    //         pdf.save("download.pdf");
    //       });
      }

    
    function handleWriting (e){
        setNewNotes(e.target.value);
        console.log(newNotes)
    }
    return(
        <>
        <div className="card" style={{marginBottom:"2rem"}}>
  <div className="card-header" style={{backgroundColor:"#bbd2b1"}} >
  <Stack direction="row" gap={"4vw"}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: 'fit-content',
          borderRadius: 1,

          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
          <Box sx={{display: 'flex',
          alignItems: 'flex-start',}}>
          <IconButton sx={{pb:0,mb:0}}>
        <FormatBoldIcon />
        </IconButton >
        <IconButton sx={{pb:0,mb:0}}>
        <FormatUnderlinedIcon/>
        </IconButton>
        <IconButton sx={{pb:0,mb:0}}>
        <FormatItalicIcon />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem style = {{backgroundColor:"#EC6A37"}}/>
        </Box>
       
        <Box>
        <Tooltip title="Download as PDF">
  <IconButton onClick={handleDownload}>
    <DownloadIcon />
  </IconButton>
</Tooltip>
        </Box>
      </Stack>
      
  </div>
  <div className="card-body">
    <TextareaAutosize onChange={handleWriting}
  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
  style={{ width: "100%" , minHeight:"58vh",maxHeight:"80vh",overflow:"auto" ,border:"none"}}

/>
  </div>
</div>


        </>
    )
}
export default Notes