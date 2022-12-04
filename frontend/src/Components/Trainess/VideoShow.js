import { AppBar } from "@mui/material"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './VideoShow.css'
import ReactPlayer from "react-player";
import Loading from "../OneComponent/Loading";
import {useState} from 'react'

function VideoShow (){
    const [loading,setLoading]=useState(true)
    return (

        <Box flex={2} position={"relative"}>
        <div className="middleRod"></div>
        <Card className="video" sx={{ width: "100%",height:"75vh",border:"1rem solid" }}>
        <CardContent sx={{p:0}}>
         <Box>
         <ReactPlayer url="https://www.youtube.com/watch?v=TIbUeeksXcI" 
  width= {"100%"} height={"70vh"}controls  onBuffer={()=>{setLoading(true)}} onPlay={()=>setLoading(false)} />
             </Box>   
        </CardContent>
       </Card>
      {/* <button class="btn btn-primary" type="button" disabled style={{backgroundColor:"#fff",borderColor:"#fff",color:"#000",
position:"absolute",left:"41%",top:"38%"}}>
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Next Video...
</button> */}
        </Box>

    )
}
export default VideoShow