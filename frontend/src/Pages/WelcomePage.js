import React from "react";
import './styling.css'
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import Subtitle from "../Components/OneComponent/Subtitle";
import {Currency} from '../Context/Currency'
import {useContext} from 'react'
import Rating from '@mui/material/Rating';
import {Box,Stack,Divider,AppBar, CardMedia} from '@mui/material';
import MostViewed from "../Components/OneComponent/MostViewed";
import Footer from "../Components/OneComponent/Footer";
import add from "../Images/add.jpeg"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReviewsIcon from '@mui/icons-material/Reviews';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar'; 
import Loading from "../Components/OneComponent/Loading";
import Reviews from "../Components/OneComponent/Reviews";
import {OneCourseResult} from "../Context/OneCourseResult";
import {Routes, Route, useNavigate} from 'react-router-dom';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import {useAuth} from '../Components/auth';
import DialogPay from "../Components/Trainess/DialogPay";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SkeletonsList from "../Components/OneComponent/SkeletonsList";
import Slider from "react-slick";
import advertise from "../Images/advertis2.png"
import advertiseI from "../Images/advertis3.png"
import advertiseA from "../Images/advertis4.png"
import TraineeCourses from "../Components/OneComponent/TraineeCourses";
import InstCourses from "../Components/OneComponent/InstCourses";
import CorporateCourses from "../Components/OneComponent/CorporateCourses";
import Subjectsss from "../Components/OneComponent/Subjectsss";
import FooterPage from "../Components/OneComponent/Footer";
import userimg1 from '../Images/userimg1.jpg'
import userimg2 from '../Images/userimg2.jpg'
import userimg3 from '../Images/userimg3.jpg'
import instimg1 from '../Images/insimg1.png'
import instimg2 from '../Images/instimg2.png'
import instimg3 from '../Images/insimg3.png'
import adminimg1 from '../Images/adminimg1.png'
import adminimg2 from '../Images/adminimg2.png'
import adminimg3 from '../Images/adminimg3.jpg'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AdminReports from "../Components/OneComponent/AdminReports";


function WelcomePage (){
    const{coursetitle} = useParams(); 
    const courseTitle = (coursetitle == undefined? "" : coursetitle)
    const navigate = useNavigate();
    const [course, setCourse]= useState([])
    const [instructor, setInstructor] = useState()
    const[loading , setLoading]=useState(true)
    const [open ,setOpen] = useState(false)
    const auth = useAuth();
    const [myCourse,setMyCourse]=useState("")
  


    useEffect(() =>{
        setLoading(true)
        let cancel
         axios({
             method:"GET",
             url : '/courses/mostViewed',
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             
             if(res.data.error === 'no such course')
             {
                navigate("/Courses")
             }
             else{
             setLoading(false)
             }

         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
         

     }, [])
    
    return (
        
        <OneCourseResult.Provider value={{open,setOpen,course}}>
        { <Box sx={{position:"relative"}}>
        <div className="wire"></div>
        {auth.user ?<>
        {auth.user.type=="individual" ?
        <Card className="card-course " sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"6rem", height:"5%",bgcolor:"#f1f1f1"}}>
        <CardContent sx={{pb: "0% !important", pl:"inherit"}}>
        {loading &&       <>  <Typography sx={{ fontSize: 30, marginBottom:'4%',marginTop:'4%'}} color="000">
         
           </Typography>
           <Slider>
          <SkeletonsList/>
          </Slider>
            </>}
       <TraineeCourses loading={loading} setLoading={setLoading}/>
      </CardContent>
    
      </Card>
      :<></>}

      {auth.user.type=="corporate"?
      <Card className="card-course " sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"6rem",bgcolor:"#f1f1f1"}}>
        <CardContent sx={{pb: "0% !important",pl:"inherit"}}>
        {loading &&       <>  <Typography sx={{ fontSize: 30, marginBottom:'4%',marginTop:'4%'}} color="000">
        
           </Typography>
           <Slider>
          <SkeletonsList/>
          </Slider>
            </>}
       <CorporateCourses loading={loading} setLoading={setLoading}/>
      </CardContent>
    
      </Card>

        :<></>}
        {auth.user.type=="instructor"?
        <Stack>
        <Card className="card-course " sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"6rem",bgcolor:"#f1f1f1"}}>
      <CardContent sx={{pl:"inherit"}}>
      {loading && <>  <Typography sx={{ fontSize: 30, marginBottom:'4%',marginTop:'4%'}} color="000">
         
         </Typography>
         <Slider>
        <SkeletonsList/>
        </Slider>
          </>}
          <InstCourses  loading={loading} setLoading={setLoading}/>
    </CardContent>
  
    </Card>
        </Stack>
        :<></>}

{auth.user.type=="admin"?

<Stack>
        <Card className="card-course " sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"6rem",bgcolor:"#f1f1f1"}}>
      <CardContent sx={{pl:"inherit"}}>
      {loading && <>  <Typography sx={{ fontSize: 30, marginBottom:'4%',marginTop:'4%'}} color="000">
         </Typography>
         <Slider>
        <SkeletonsList/>
        </Slider>
          </>}
     <AdminReports loading={loading} setLoading={setLoading} />
     </CardContent>
  
  </Card>
      </Stack>
      :<></>}

        </>:<></>}



      <Stack sx={{mb:"6rem"}} direction={"row"} sx={{justifyContent: "center",
    gap: "1rem",
    position: "relative",mb:"6rem"}} className="home">
        <div className="home2"></div>
          
       
			<img src={add} alt="Logo" style={{width: "47%",
    border: "14px solid darkgrey",
    borderRadius:" 6px",
    zIndex: "3",
    boxShadow:" 0px 2px 8px 1px rgb(0 0 0 / 80%)"}}
          
            />
             <img width={"50%"} 
                src={auth.user?((auth.user.type=="admin"&&advertiseA)|| (auth.user.type=="instructor"&&advertiseI) ||
                ((auth.user.type=="corporate"||auth.user.type=="individual")&&advertise)):advertise}
                loading="lazy"
                style={{width:"47%",
                    zIndex: "3",
                    position: "relative",
                    borderRadius: "6px",
                    boxShadow:" 0px 2px 8px 1px rgb(0 0 0 / 80%)",
                    border: "14px solid darkgray"}}
              />
	
      </Stack>

      
        <Stack>
        <Card  sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"3rem",bgcolor:"#f1f1f1"}}>
      <CardContent sx={{pl:"inherit"}}>
      {loading && <>  <Typography sx={{ fontSize: 30, marginBottom:'4%',marginTop:'-2%'}} color="000">
           Most Viewed
         </Typography>
         <Slider>
        <SkeletonsList/>
        </Slider>
          </>}
     <MostViewed loading={loading} setLoading={setLoading} />
    </CardContent>
    </Card>
        </Stack>
   
{((auth.user && (auth.user.type=="corporate"||auth.user.type=="individual"))|| !auth.user) && 
        <Stack direction="row" justifyContent={"center"}  gap={"5rem"} marginBottom={"6rem"} marginTop={"2rem"}>
       
        <Card sx={{position:"relative",width:"20rem",height:"20rem"}}>
      <CardMedia
       component="img"
       
        image={userimg1}
        title="green iguana"
      />
      </Card>
         
      <Card sx={{ position:"relative",width:"20rem",height:"20rem",top:"6rem"}}>
      <CardMedia
       component="img"
       sx={{    position: "relative",
        top: "2rem"}}
        image={userimg3}
        title="green iguana"
      />
      </Card>

      <Card sx={{position:"relative",width:"20rem",height:"20rem"}}>
      <CardMedia
       component="img"
       
        image={userimg2}
        title="green iguana"
      />
      </Card>
         
       </Stack>}

       {auth.user && auth.user.type=="instructor" && 
        <Stack direction="row" justifyContent={"center"}  gap={"5rem"} marginBottom={"6rem"} marginTop={"2rem"}>
       
        <Card sx={{position:"relative",width:"20rem",height:"20rem"}}>
      <CardMedia
       component="img"
       sx={{position:"relative",top:"4rem"}}
        image={instimg1}
        title="green iguana"
      />
      </Card>
         
      <Card sx={{ position:"relative",width:"20rem",height:"20rem",top:"6rem"}}>
      <CardMedia
       component="img"
       
        image={instimg3}
        title="green iguana"
      />
      </Card>

      <Card sx={{position:"relative",width:"20rem",height:"20rem"}}>
      <CardMedia
       component="img"
       
        image={instimg2}
        title="green iguana"
      />
      </Card>
         
       </Stack>}

       {auth.user && auth.user.type=="admin" &&
        <Stack direction="row" justifyContent={"center"}  gap={"5rem"} marginBottom={"6rem"} marginTop={"2rem"}>
       
        <Card sx={{position:"relative",width:"20rem",height:"20rem"}}>
      <CardMedia
       component="img"
       
        image={adminimg1}
        title="green iguana"
      />
      </Card>
         
      <Card sx={{ position:"relative",width:"20rem",height:"20rem",top:"6rem"}}>
      <CardMedia
       component="img"
       
        image={adminimg3}
        title="green iguana"
      />
      </Card>

      <Card sx={{position:"relative",width:"20rem",height:"20rem"}}>
      <CardMedia
       component="img"
       
        image={adminimg2}
        title="green iguana"
      />
      </Card>
         
       </Stack>}

        <Stack >
        <Card  sx={{position:"relative",left:"0",right:"0",p:"2rem",mt:"6rem"}}>
      <CardContent>
        
      {loading && <>  <Typography >
           Subjects 
         </Typography>
         </>}
          <Subjectsss  loading={loading} setLoading={setLoading}/>
          </CardContent>
  
    </Card>
        </Stack>


      
     
      </Box>}

       <Box sx={{  width: "100%",
    position: "absolute",
    left: 0}}>
      <AppBar position="sticky" sx={{pt:"3%!important",backgroundColor: "#f1f1f1",boxShadow:"none",mt:"10%",bottom:0,
      boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)",zIndex:1,left:0}}>
      <FooterPage sx={{backgroundColor: "#f1f1f1",height:"fit-content"}}/>
    </AppBar>
    </Box>
     </OneCourseResult.Provider>

    )
}
export default WelcomePage
