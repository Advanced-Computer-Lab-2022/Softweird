import React from "react";
import './styling.css'
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import Subtitle from "../Components/OneComponent/Subtitle";
import {Currency} from '../Context/Currency'
import {useContext} from 'react'
import Rating from '@mui/material/Rating';
import {Box,Stack,Divider} from '@mui/material';
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
import Pending from "@mui/icons-material/Pending";
import DialogAccess from '../Components/Trainess/DialogAccess'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import ApplyDiscount from '../Components/Admin/ApplyDiscount';
import DialogDisc from '../Components/Admin/DialogDisc'
import DiscountIcon from '@mui/icons-material/Discount';
import { IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import ToastMess from '../Components/OneComponent/ToastMess'
import { Toast } from  '../Context/Toast'
import ViewInstr from './ViewInstr '

function OneCourse (){
  const [message,setMessage] =useState("")
  const {setOpenToast} =useContext(Toast)
    const{coursetitle} = useParams(); 
    const courseTitle = (coursetitle == undefined? "" : coursetitle)
    const navigate = useNavigate();
    const [course, setCourse]= useState([])
    const [instructor, setInstructor] = useState()
    const[loading , setLoading]=useState(true)
    const {curr , setCurr,rate,setRate} = useContext(Currency)
    const [open ,setOpen] = useState(false)
    const auth = useAuth();
    const [openPay,setOpenPay] = useState(false)
    const [openAccess,setOpenAccess] = useState(false)
    const [myCourse,setMyCourse]=useState("")
    const [openDisc, setOpenDisc] = React.useState(false);
    const [openInst,setOpenInst]=useState(false)

    function handleOpen(){
      console.log("dd")
      setOpenInst(true);
    }

    function handleRemove() {
      if (window.confirm("Are you sure you want to remove promotion?")){
            let cancel
            axios({
              method:"PATCH",
              url : '/Admin/removePromote',
              data : {courseTitle:course.title},
              headers : {'Content-Type' : 'application/json'},
              cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
          
                setCourse(res.data)
                setMessage("Promotion Removed Successfully")
                setOpenToast(true)
            }).catch(e=>{
                if(axios.isCancel(e)) return 
            })
            return () => cancel ()
            
         }
    } 
const handleRegister =() => {
    if(!auth.user){
        navigate("/login");
    }
   else{
        setOpenPay(true);
    }

}

const handleAccess = () =>{
  setOpenAccess(true)

}
    useEffect(() =>{
        setLoading(true)
        let cancel
         axios({
             method:"GET",
             url : `/Courses/${courseTitle}`,
             params:{userId:(auth.user!=undefined?auth.user.id:undefined),
                type:(auth.user!=undefined ?auth.user.type:undefined)},
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             
             if(res.data.error === 'no such course')
             {
                navigate("/Courses")
             }
             else{
             setLoading(false)
            setCourse(res.data.course)
            setInstructor(res.data.instructor[0])
            setMyCourse(res.data.myCourse)
             }

         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
         

     }, [])

     
 
    return (
        
        <OneCourseResult.Provider value={{open,setOpen,course,openDisc, setOpenDisc ,setMessage,setCourse}}>
        {!loading && course&& <Box sx={{position:"relative"}}>
        <div className="wire"></div>
        <Card className="card-course " sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"6rem"}}>
        
        <CardContent>
        <Typography sx={{ fontSize: "2.5rem" }} >
          {course.title}
        </Typography>
        {auth.user ?
    
    <>
    {/*  For Registered Students Corporates&individual*/}
    {(auth.user.type=="individual" || auth.user.type=="corporate") ?
    <>
    {myCourse.courseInfo.some(c=>c.course==course._id && c.certificate =="")&&auth.user.type=="corporate" &&
    <Stack position="absolute" right="15%" top="13%" direction="row" gap={0.5}>
    <TaskAltIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Registered</Typography>
    </Stack> }

    {auth.user.type=="individual" &&
    myCourse.courseInfo.some(c=>c.course==course._id && c.certificate =="" && 
    ((c.refund.set==true && c.refund.stata=="rejected" )|| c.refund.set==false))&&
    <Stack position="absolute" right="15%" top="13%" direction="row" gap={0.5}>
    <TaskAltIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Registered</Typography>
    </Stack> }

    {auth.user.type=="individual" &&
    myCourse.courseInfo.some(c=>c.course==course._id && c.certificate =="" && 
    ((c.refund.set==true && c.refund.stata=="pending" ))) &&
    <Stack position="absolute" right="15%" top="13%" direction="row" gap={0.5}>
    <Pending fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Waiting for response</Typography>
    </Stack> }


    {/*  For certified Students individual and Corporate*/}
    {myCourse.courseInfo.some(c=>c.course==course._id && c.certificate !="")&&
     <Stack position="absolute" right="15%" top="13%" direction="row" gap={0.5}>
    <VerifiedIcon fontSize={"1rem"}sx={{color:"#faaf00"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Certified</Typography>
    </Stack> }

    {auth.user.type=="corporate" &&
   myCourse.accessRequests.some(c=>c.course==course._id && c.state =="pending") && 
   <Stack position="absolute" right="15%" direction="row" gap={0.5}>
   <Pending fontSize={"1rem"}sx={{color:"#c50d0d"}}/>
 <Typography  fontSize={"0.8rem"} color={"grey"}>  Pending Access Request </Typography>
   </Stack> }

    

    </> 
    :<></>}
     {/* Instructor Courses*/}
    {auth.user.type=="instructor"&& course.instructor_id==auth.user.id ?
     <Stack position="absolute" right="15%" top="13%" direction="row" gap={0.5}>
     <CollectionsBookmarkIcon fontSize={"1rem"}sx={{color:"green"}}/>
    <Typography  fontSize={"0.8rem"} color={"grey"}> Mine</Typography>
    </Stack> :<></>}
    </>:<></>}
        <Typography variant="h6" color="text.secondary" component="div" gutterBottom>
         {course.subject}
        </Typography>
        
        <Typography variant="P" fontSize={"0.8rem"}>
        {course.summary}
        </Typography>
        <Stack direction = "row" gap={10}>
        <Stack direction="row" gap={0.5} paddingTop={"2rem"}>
            <Typography sx={{fontSize:"0.87rem"}} >{course.rating.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback1"
             value={course.rating.$numberDecimal}
             readOnly
            precision={0.5}
             size='small'/>
             <Typography sx={{fontSize:"0.87rem"}} >({course.numberRating})</Typography>
             </Stack>
       {course.reviews && <Stack direction="row" gap={0.5} paddingTop={"2rem"}>
       <ReviewsIcon sx= {{color:"#bbd2b1"}}/>
       <Typography variant="p" sx={{fontSize:"0.87rem"}} >No of reviews:  </Typography>
        <Typography variant="p" sx={{fontSize:"0.87rem"}} >{course.reviews.length}</Typography>
        </Stack>     }
        </Stack>
        <Stack direction="row" gap={0.5} paddingTop={"2rem"} alignItems={"center"}>
       <GroupIcon sx= {{color:"#bbd2b1"}}/>
       <Typography variant="p" sx={{fontSize:"0.87rem"}} >Currently Enrolled Students:  </Typography>
        <Typography variant="p" sx={{fontSize:"0.87rem"}} >{course.enrolledStudents}</Typography>
        </Stack> 
        
      {auth.user && auth.user.type!="corporate"  && <> 
        {(course.promotionInst.set==true|| course.promotionAdmin.set==true) && auth.user.type!="admin"&&
         <div className="stamp is-nope"><p style={{margin:"8% 0"}}>{(parseFloat(course.promotionInst.value.$numberDecimal)
         +parseFloat(course.promotionAdmin.value.$numberDecimal))}% Sale</p> </div>}

        {/* <Stack direction="row" gap={0.5} paddingTop={"2rem"} >
       

       <Typography variant="p" sx={{fontSize:"0.87rem" , fontWeight:"bolder"}} >Price:  </Typography>
        {course.price==="Free" ?
        <Typography sx={{fontSize:"0.87rem",fontWeight:"bolder"}} >Free</Typography>:
        <Typography sx={{fontSize:"0.87rem",fontWeight:"bolder"}} >{course.price * rate} {curr}</Typography>}

        
        </Stack>   */}
        {auth.user && auth.user!="corporate" && <>
      {course.price!="Free" && <> <Stack direction="row" paddingTop={"2rem"} marginBottom={"2rem"} alignItems={"center"}>
        <Stack direction="row" gap={"8px"}  paddingRight={"10%"} alignItems={"center"} >
       <Typography sx={{fontSize:"0.87rem" }} variant='h6' >Price of Course: </Typography>
    
    
      <Stack direction="row" alignItems={"center"} gap={2}>
      <Typography  sx={{fontSize:"0.87rem",fontWeight:"bolder",position:"relative"}} >{course.price*rate}{curr}
        
    {(course.promotionInst.set==true|| course.promotionAdmin.set==true) &&
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" fill="currentColor" class="bi bi-slash-lg" viewBox="0 0 16 16" style={{ color: "#c50d0d",position: "absolute",
    left:"-19%",
    fontSize: "2.5rem",
    top: "-60%",
    transform:" rotate(10deg)",}}>
  <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
</svg>}
     </Typography>
    {(course.promotionInst.set || course.promotionAdmin.set )&& <ArrowRightAltIcon sx={{fontWeight:"bold" ,fontSize:"2rem"}}/>}
     {(course.promotionInst.set || course.promotionAdmin.set) && <Typography  sx={{fontSize:"0.87rem",fontWeight:"bolder",position:"relative"}} >
     {((100-(parseFloat(course.promotionInst.value.$numberDecimal)
  +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price*rate}{curr}</Typography>}
     </Stack>
        </Stack>

       {auth.user.type=="admin"&& <Stack direction="row" alignItems="center" gap={2}>
        {(course.promotionInst.set || course.promotionAdmin.set )&& 
        <Typography variant="p">
         <DiscountIcon sx={{color:"#bbd2b1"}} />
         </Typography>}
        {course.promotionAdmin.set && 
        <Typography variant="p" sx={{border: "1px solid rgb(197 13 13)", borderRadius: "12px", padding:" 0.5rem",
    boxShadow: "-2px 3px 0px 0px rgb(197 13 13 / 24%)"}}>{course.promotionAdmin.value.$numberDecimal}% by You
        <Tooltip title="remove discount" >
        <IconButton onClick={handleRemove} >
        <DeleteIcon  sx={{fontSize:"1.4rem",ml:"1rem"}} />
        </IconButton>
        </Tooltip></Typography>}
       
        {course.promotionAdmin.set && course.promotionInst.set && 
        <Typography variant="p" sx={{fontStyle:"italic"}}>and</Typography>}
       {course.promotionInst.set && <Typography variant="p" sx={{border: "1px solid rgb(197 13 13)", borderRadius: "12px", padding:" 0.9rem",
    boxShadow: "-2px 3px 0px 0px rgb(197 13 13 / 24%)"}}> {course.promotionInst.value.$numberDecimal}% by Instructor
      </Typography>
    }
         
       </Stack>}
        </Stack>
        {course.promotionAdmin.set==false && auth.user.type=="admin" && <ApplyDiscount  sx={{mt:"3rem"}} discount={"Apply Discount"}/>}
        {course.promotionAdmin.set==true && auth.user.type=="admin" &&<ApplyDiscount  sx={{mt:"3rem"}}  discount={"Update Discount"}/>}</>}
        {course.price=="Free" &&  <Stack direction="row" paddingTop={"2rem"} marginBottom={"2rem"} alignItems={"center"}>
        <Stack direction="row" gap={"8px"}  paddingRight={"10%"} alignItems={"center"} >
       <Typography sx={{fontSize:"0.87rem" }} variant='h6' >Price of Course: </Typography>
    
    
      <Stack direction="row" alignItems={"center"} gap={2}>
      <Typography  sx={{fontSize:"0.87rem",fontWeight:"bolder",position:"relative"}} > Free</Typography>
        </Stack></Stack></Stack>}
         </>}</>}

      </CardContent>
      <CardActions>
      <Stack direction="row" gap={3} paddingTop={"1rem"} alignItems="center">
      
      {auth.user ?
    
    <>
    {/*  For Registered Students Corporates&individual*/}
    {(auth.user && auth.user.type=="individual" ) ?
    <>
    {
    myCourse.courseInfo.some(c=>c.course==course._id && c.certificate =="" && 
    (c.refund.set==false || (c.refund.set==true && c.refund.state=="rejected")))&&
  
      <>
          <HourglassTopOutlinedIcon sx={{color:"#c50d0d",position:"absolute"}} />
    <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"2rem",
    boxShadow:"none",
    "&:hover":{
        cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"

        }}}
        onClick={() => window.location.href=`/MyCourses/${course.title}`} >Complete My Course</Button>
        <ArrowForwardIosIcon/>
      <SchoolIcon />
    
    
      </>
    }

{auth.user && auth.user.type=="individual" && 
    myCourse.courseInfo.some(c=>c.course==course._id && c.certificate =="" && 
     (c.refund.set==true && c.refund.state=="pending"))&&
  
      <>
         
    <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",
    boxShadow:"none"}}
        disabled
        endIcon={ <MoreHorizIcon sx={{color:"#c50d0d"}} />}
        >Pending Refund Request </Button>
       
    
    
      </>
    }





    {/*  For certified Students individual and Corporate*/}
    {myCourse.courseInfo.some(c=>c.course==course._id && c.certificate !="")&&
     
     <>
     <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
     boxShadow:"none",
     "&:hover":{
         cursor: "pointer",
         color:"#bbd2b1",
         backgroundColor:"#fff"
 
         }}}
         onClick={() => window.location.href=`/MyCourses/${course.title}`}>View My Course</Button>
         <ArrowForwardIosIcon/>
       <SchoolIcon sx={{color:"#faaf00"}}/>
       </>
     }
    {!(myCourse.courseInfo.some(c=>c.course==course._id ))&&
     
     <>
      <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
    boxShadow:"none",
    "&:hover":{
        cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"

        }}}
        onClick={handleRegister}>Study Now</Button>
        <ArrowForwardIosIcon/>
      <SchoolIcon />
       </>
     }
    </> 
    :<> </>}
     {/* Instructor Courses*/}
    {auth.user.type=="instructor" && course.instructor_id==auth.user.id ?
    
      <>
    <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
    boxShadow:"none",
    "&:hover":{
        cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"

        }}}
        onClick={() => window.location.href=`/MyCourses/${course.title}`}>View My Course</Button>
  
      </>
    :<></>}

{(auth.user && auth.user.type=="corporate" ) ?
    <>
    {
    myCourse.courseInfo.some(c=>c.course==course._id && c.certificate =="")&&
  
      <>
          <HourglassTopOutlinedIcon sx={{color:"#c50d0d",position:"absolute"}} />
    <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"2rem",
    boxShadow:"none",
    "&:hover":{
        cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"

        }}}
        onClick={() => window.location.href=`/MyCourses/${course.title}`} >Complete My Course</Button>
        <ArrowForwardIosIcon/>
      <SchoolIcon />
    
    
      </>
    }





    {myCourse.courseInfo.some(c=>c.course==course._id && c.certificate !="")&&
     
     <>
     <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
     boxShadow:"none",
     "&:hover":{
         cursor: "pointer",
         color:"#bbd2b1",
         backgroundColor:"#fff"
 
         }}}
         onClick={() => window.location.href=`/MyCourses/${course.title}`}>View My Course</Button>
         <ArrowForwardIosIcon/>
       <SchoolIcon sx={{color:"#faaf00"}}/>
       </>
     }


{myCourse.accessRequests.some(c=>c.course==course._id && c.state =="pending")  ?
   <>
   <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",
   boxShadow:"none"}}
       disabled
       endIcon={ <MoreHorizIcon sx={{color:"#c50d0d"}} />}
       >Pending Access Request </Button>
       </>
     :
    (!(myCourse.courseInfo.some(c=>c.course==course._id ))?  
   ( myCourse.company.courses.some(c=>c.course==course._id && c.level<= myCourse.level) ?
     
     <>
      <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
    boxShadow:"none",
    "&:hover":{
        cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"

        }}}
        onClick={handleRegister}>Study Now</Button>
        <ArrowForwardIosIcon/>
      <SchoolIcon />
       </> : 
  
  
     <>
      <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
    boxShadow:"none",
    "&:hover":{
        cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"

        }}}
        onClick={handleAccess}>Study Now</Button>
        <ArrowForwardIosIcon/>
      <SchoolIcon />
       </>
       
       ):<></>
     )}
     
     
     




    </> 
    :<> </>}

    </>:
    <>
    <Button variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
    boxShadow:"none",
    "&:hover":{
        cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"

        }}}
        onClick={handleRegister}>Study Now</Button>
        <ArrowForwardIosIcon/>
      <SchoolIcon />
      </>}




      
      
      </Stack>
      </CardActions>
      </Card>
      <Stack gap={7} direction={"row"} maxWidth={"60vw"} alignItems={"center"} mb={"6rem"}>
          <Stack flex ={1} gap={2} alignItems={"center"} >
          <Avatar src="/static/images/avatar/1.jpg" />
          <Typography onClick={handleOpen} sx={{textDecoration:"underline",'&:hover':{cursor:"pointer",color:"#c50d0d"}}}>{instructor.user.fName} {instructor.user.lName}</Typography>
          <Stack direction="row" gap={0.5} paddingTop={"1rem"}>
            <Typography svariant="p" x={{fontSize:"0.87rem"}} >{instructor.rating.rate.$numberDecimal}</Typography>
             <Rating 
             name="text-feedback2"
             value={instructor.rating.rate.$numberDecimal}
             readOnly
            precision={0.1}
             size='small'/>
             <Typography sx={{fontSize:"0.87rem"}} >({instructor.rating.numberPeople})</Typography>
             </Stack>
          </Stack>
          <Divider orientation="vertical" variant="middle" flexItem sx={{border:"0.5px #bbd2b1 solid"}} />
          <Stack flex ={3} gap={2} >
          <Typography variant="p"> {instructor.biography}</Typography>
          </Stack>
      </Stack>
      {course.reviews && course.reviews.length!=0 && <Reviews course={course} cn={true}/>}
      <Stack direction="row" gap={1} alignItems={"center"} mb={"2rem"} mt={"6rem"}>
     < AutoStoriesIcon sx= {{color:"#bbd2b1"}}/>
      <Typography variant={"h5"}>Begin Your Study Path</Typography>
      </Stack>
    
      <Subtitle/>
     
     </Box>}
     {loading && <Loading />}
     <DialogPay openPay={openPay} setOpenPay={setOpenPay} course={course}/>
     <DialogAccess openAccess={openAccess} setOpenAccess={setOpenAccess} course={course} setMyCourse={setMyCourse}/>
     <ToastMess message={message}/>
     <DialogDisc />

     <ViewInstr openInst={openInst} setOpenInst={setOpenInst} instId={course.instructor_id} />
     </OneCourseResult.Provider>
    )
}
export default OneCourse
