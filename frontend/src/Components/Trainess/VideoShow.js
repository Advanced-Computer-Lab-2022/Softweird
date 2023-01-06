import { AppBar } from "@mui/material"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './VideoShow.css'
import ReactPlayer from "react-player";
import Loading from "../OneComponent/Loading";
import {useState,useContext,useEffect} from 'react'
import {TraineeCourse} from '../../Context/TraineeCourse'
import axios from 'axios'
import {useAuth} from '../auth'
import jsPDF from 'jspdf'
import Certificate from '../../Images/Certificate.png'

function VideoShow (){
  const auth = useAuth();
    const [loading,setLoading]=useState(true)
    const {course,setCourse,index,setIndex,subIndex,setSubIndex,myCourse,setProg,setMyCourse,setReload,video,setmyVideo,setPlayVideo,playVideo,
    firstOpen,videosWatched} = useContext(TraineeCourse)
    var counter = 0;
    var videos = [];
    const [color,setColor]=useState("black")
   
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
  
     useEffect(()=>{

        
        myCourse.courseInfo.map(c=>{
    
          if(c.course==course._id && c.certificate=="true"){

            setColor("#faaf30")
          }

        })
      
         
        
      },[myCourse])

          const pdfGenerate=(email)=>{
           var date= (new Date()).toString();
            var doc=new jsPDF('landscape', 'px', 'a4','false');
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(Certificate,'PNG',0,0,width,height)
        
        doc.text(280,250, auth.user.fName + " "+ auth.user.lName)
        doc.text(260,327,course.title)
        date = date.slice(0,10)
        doc.text(290,360,`${date}`)

          const pdfOut = doc.output("datauristring");
          doc.save('a.pdf')
          
          let cancel
         
              axios({
                  method:"POST",
                  url : "/Individual/sendCert",
                  data :{ pdf:pdfOut,email:email},
                  headers : {'Content-Type' : 'application/json'},
                  cancelToken: new axios.CancelToken (c => cancel = c)
              }).then (res => {
                
              }).catch(e=>{
                  console.log(e)
                   if(axios.isCancel(e)) return 
                   
              
              })
        
              return () => cancel ()
         
        }

    function handleEnd(){
     
      if(!videosWatched.includes(videos[counter].text) && auth.user.type=="individual"){
      let cancel
      axios({
          method:"PATCH",
          url : `/Individual/videoWatched/${auth.user.id}`,
          data : {subtitleTitle:course.subtitles[subIndex].title,videoText:videos[counter].text,courseTitle:course.title },
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
          setReload(true)
          setMyCourse(res.data.coursenew)
         
          if(res.data.cer=="true"){
            pdfGenerate(res.data.coursenew.user.email)

          }
          setCourse(course)
          var p =""
  
          if(res.data.length!=0)
        {  res.data.courseInfo.map(c=>{
            if(c.course===course._id){
               p= Math.round(((c.percentage.progress/c.percentage.total)*100)*10)/10
      
            }
           
            })}
            setProg(p)
         
      }).catch(e=>{
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
    }
    if(!videosWatched.includes(videos[counter].text) && auth.user.type=="corporate"){
      console.log("leh")
      let cancel
      axios({
          method:"PATCH",
          url : `/Corporate/videoWatched/${auth.user.id}`,
          data : {subtitleTitle:course.subtitles[subIndex].title,videoText:videos[counter].text,courseTitle:course.title },
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
        
        setReload(true)
        setMyCourse(res.data.coursenew)
       
        if(res.data.cer=="true"){
          pdfGenerate(res.data.coursenew.user.email)
        }
        setCourse(course)
          
          var p=""
          if(res.data.length!=0)
          {  res.data.courseInfo.map(c=>{
              if(c.course===course._id){
                 p= Math.round(((c.percentage.progress/c.percentage.total)*100)*10)/10
                 console.log(c.percentage.progress)
                
        
              }
             
              })}
              setProg(p)
         
      }).catch(e=>{
        console.log(e)
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
    }

    }
 
    return (

<>
      {videos.length !=0 && <Box flex={2} position={"relative"} >

        <div className="middleRod"></div>
        <Card className="video" sx={{ width: "100%",height:"75vh",border:`1rem solid ${color}`,backgroundColor:"lightgrey" }}>
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