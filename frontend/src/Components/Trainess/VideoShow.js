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
import {useState,useContext} from 'react'
import {TraineeCourse} from '../../Context/TraineeCourse'
import axios from 'axios'

function VideoShow (){
    const [loading,setLoading]=useState(true)
    const {course,setCourse,index,setIndex,subIndex,setSubIndex,myCourse,setMyCourse,setReload,video,setmyVideo,setPlayVideo,playVideo,
    firstOpen} = useContext(TraineeCourse)
    var counter = 0;
    var videos = [];
    if (course.subtitles ){
      course.subtitles.map((subtitle,i)=>{
        if(i>=subIndex){
          subtitle.video.map((video,j)=>{
            if(i==subIndex && j>=index){
              videos.push(video)
            }
            else if(i>subIndex)
             videos.push(video)
          })
        }
      })
    }
     if(videos.length!=0)  setmyVideo(videos[counter].text)
      

    function handleEnd(){
      let cancel
      axios({
          method:"PATCH",
          url : "/Individual/videoWatched/638a211fdae5256326254c29",
          data : {subtitleTitle:course.subtitles[subIndex].title,videoText:videos[counter].text,courseTitle:course.title },
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
          setReload(true)
          setMyCourse(res.data)
          setCourse(course)
         
      }).catch(e=>{
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
    }
    return (
<>
      {videos.length !=0 && <Box flex={2} position={"relative"} >
        <div className="middleRod"></div>
        <Card className="video" sx={{ width: "100%",height:"75vh",border:"1rem solid",backgroundColor:"lightgrey" }}>
        <CardContent sx={{p:0}}>
         <Box>
        {firstOpen ?<Box sx={{textAlign: "center",
    position: "absolute",
    top: "45%",
    right: "16%"}}> <Typography variant="p" sx={{fontWeight:"bold"}}>Welcome <br/>Start your journey of accomplishments by pressing on first video
        😃</Typography> </Box>
        : <ReactPlayer url={videos[counter].link}  playing={playVideo}
  width= {"100%"} height={"70vh"}controls  onBuffer={()=>{setLoading(true)}} onPlay={()=>setLoading(false)} onEnded={handleEnd}/>}
             </Box>   
        </CardContent>
       </Card>
      {/* <button class="btn btn-primary" type="button" disabled style={{backgroundColor:"#fff",borderColor:"#fff",color:"#000",
position:"absolute",left:"41%",top:"38%"}}>
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Next Video...
</button> */}
        </Box>}
        </>

    )
}
export default VideoShow