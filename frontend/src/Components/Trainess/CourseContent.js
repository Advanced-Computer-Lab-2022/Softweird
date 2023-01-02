import { AppBar } from "@mui/material"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useEffect, useState} from 'react'
import { styled ,Paper,Stack} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Notes from "./Notes";
import SubtitleContent from '../Trainess/SubtitleContent'
import Star from "@mui/icons-material/Star";
import {TraineeCourse} from '../../Context/TraineeCourse'
import {useContext} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Rating from '@mui/material/Rating';
import ToastMess from '../OneComponent/ToastMess'
import {Toast} from '../../Context/Toast'
import axios from 'axios'
import Loading from '../OneComponent/Loading'
import {useAuth} from '../auth'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

import Congratulations from '../../Images/congratulations.png'
import CertificateButton from './CertificateButton'






const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    paddiingBottom:"1rem",
    '& .MuiTabs-indicator': {
      backgroundColor: 'grey',
    },
  });
  const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    fontWeight:"bolder",
  
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    '&.Mui-selected': {
      color: '#a5b89d',
      fontWeight:"bolder",
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));

var time= 0;

function CourseContent (){
  const {openToast,setOpenToast} = useContext(Toast)
  const{myCourse,course,setMyCourse,setReload,setCourse,CourseInfo,setCourseInfo,exam,setexam,successExam,setSuccesexam,failedExam,setFailedexam,
    openSolve,setOpenSolve,openGrade,setOpenGrade,playVideo,setPlayVideo,reload,prog,setProg} = useContext(TraineeCourse)
    const [value, setValue] = useState('1');
    const [valuerate, setRateValue] = useState(0);
    const[loading,setLoading] = useState(true)
    const [rated,setRated]=useState(false)
  
    const auth = useAuth()
const [rating,setRating]=useState()
    

    useEffect(()=>{
      setTimeout(function () {
        setLoading(true)
        var p=""
        if(myCourse.length!=0)
        {  myCourse.courseInfo.map(c=>{
            if(c.course===course._id){
               p= Math.round(((c.percentage.progress/c.percentage.total)*100)*10)/10
               setRating(c.rating)
              
      
            }
           
            })}
            setProg(p)
       
      setRated(false)
     
    console.log("gg")
     
  
      
      setLoading(false)
      
    }, time);
    time = 0
    },[myCourse,course])
    console.log(prog)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function handleRateClick(event){
      setAnchorEl(event.currentTarget);

    }

    function handleRate(event){
      setRateValue(event.target.value)
    }
    function handleSendRate(){

      if(auth.user.type=="individual")
  {    let cancel
      axios({
     method:"PATCH",
     url : `/Individual/course/rate/${auth.user.id}`,
     data : {courseTitle:course.title,rating : parseInt(valuerate) },
     headers : {'Content-Type' : 'application/json'},
      cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
    setMyCourse(res.data)
    setRated(true)
    setOpenToast(true)
    setAnchorEl(null);
    setReload(true)
    time = 3000
  }).catch(e=>{
     if(axios.isCancel(e)) return 
  })
  return () => cancel ()
  }

  else if(auth.user.type=="corporate")
  {    let cancel
      axios({
     method:"PATCH",
     url : `/Corporate/course/rate/${auth.user.id}`,
     data : {courseTitle:course.title,rating : parseInt(valuerate) },
     headers : {'Content-Type' : 'application/json'},
      cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
    setMyCourse(res.data)
    setRated(true)
    setOpenToast(true)
    setAnchorEl(null);
    setReload(true)
    time = 3000
  }).catch(e=>{
     if(axios.isCancel(e)) return 
  })
  return () => cancel ()
  }

    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
    };

   

  
    return (
      <>
      {!loading && 
        <AppBar className="navbar navbar-expand-lg navbar-light bg-light" 
        sx={{width:"30%" , left:{sm:"-1.5rem",md:"-1.5rem",lg:"-3.5rem",xl:"-11.5rem"} , 
        top:{sm:"-3rem",md:"-3rem",lg:"-4rem",xl:"-5rem"},marginBottom:"-30rem",
         paddingBottom:"3rem",position:"relative",zIndex:"initial",boxShadow:"none",
         color:"#000",display:{xs:"none",sm:"block",md:"block",lg:"block",xl:"block"}}}>
     <Box sx={{ width: '100%', typography: 'body1' }}>
       
       <Card sx={{ minWidth: 275 ,position:"relative",top:"-6px"}}>
      <CardContent sx={{pt:"5%"}}>
          <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} sx={{mt:"2%"}}>
        <Typography sx={{ fontSize: "1rem",fontWeight:"bold" }} color="text.secondary" gutterBottom>
       {prog || 0}%   progress
        </Typography>
                  
      {rating===false && 
           <>
           <Button variant="outlined" startIcon={<Star sx={{color:"#faaf00"}} />}
                      onClick={handleRateClick}  aria-controls={open ? 'demo-customized-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      variant="contained"
                      disableElevation
                      sx={{color:"#000" , border:"1px solid rgba(197, 13, 13, 0.6)" ,ml:"0.8rem",
                      backgroundColor:"white",
                      '&:hover':{
                       border:"1px solid rgba(197, 13, 13)" ,
                       backgroundColor:"white"
                      }}} >
        Rate
      </Button>
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{display:"flex",p:"1rem"}}
      >
        <Stack direction="column" sx={{padding: "0.5rem 1rem"}}>
        
        <Typography variant="p" sx={{pt:"2%"}}> <Rating name="no-value" value={valuerate} onChange={handleRate}/></Typography>
        <Typography variant="p" >   <Button
     sx={{ color:"rgba(197, 13, 13, 0.8)" , position: "relative",
     right: "-54%",
     '&:hover':{
      color:"rgba(197, 13, 13)" ,
      backgroundColor:"white"
     }}} onClick={handleSendRate} disabled={rated}>
       Done
      </Button>
     
      </Typography>
      </Stack>
 
      </Menu></>}


        
        </Stack>
        </CardContent>
        </Card>
       <TabContext value={value}>
      <Box sx={{borderColor: 'divider' }}>
      <AntTabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <AntTab value="1" label="Course Content" />
        <AntTab value="2" label="Notes" />
        {myCourse.courseInfo.some(c=>c.course==course._id && c.certificate=="true") &&
        <AntTab value="3" label="Certificate" sx={{ml:"1rem"}}icon={<MilitaryTechIcon sx={{color:"#faaf30",position:"absolute",left:"-0.3rem",top:"1.5rem"}}/>}/>}
      </AntTabs>
      </Box>
        <TabPanel value="1" style={{padding:0}}>
            <SubtitleContent />
        </TabPanel>
        <TabPanel value="2" style={{padding:0}}>
            <Notes />
        </TabPanel >

        <TabPanel value="3" style={{padding:0}}>
          <Box backgroundColor="white" sx={{border: "1px solid #f1f1f1",
    borderTop: "0px" , pb:"0.5rem"}}>
      <Stack alignItems={"center"}>
           <img src={Congratulations} style={{position:"relative"}}/>
           <CertificateButton course={course} myCourse={myCourse}/>
           </Stack>
           </Box>
        </TabPanel >

      </TabContext>
    </Box>
        </AppBar>}
        {rated && <ToastMess message="Course rated successfully" />}
        {loading && <Loading />}
        </>
    )
}
export default CourseContent