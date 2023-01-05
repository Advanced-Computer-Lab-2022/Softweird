import { useEffect,useState } from "react"
import Loading from "../../Components/OneComponent/Loading"
import OneCourseResult from '../../Components/Trainess/OneCourseResult'
import { Stack, Typography,Box } from "@mui/material"
import axios from 'axios'
import BookIcon from '@mui/icons-material/Book';
import { useAuth } from "../../Components/auth"
import {TraineeMyCourses} from "../../Context/TraineeMyCourses"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar } from "@mui/material"
import NoCourse from '../../Components/OneComponent/NoCourse'
import { styled } from "@mui/material"

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: '000',
      '&.Mui-selected': {
        color: '#000000',
      },
      '&:hover': {
        color: '#bbd2b1',
        opacity: 1,
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
      },
    }),
  );

  

    const StyledTabs = styled((props) => (
      <Tabs
        {...props}
        
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
      />
    ))({
      '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      '& .MuiTabs-indicatorSpan': {
        maxWidth: '50%',
        width: '100%',
        backgroundColor: '#bbd2b1',
      },
    });

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function MyCourses(){
    const auth = useAuth()
    const[myCourses,setMyCourses] = useState([])
    const [courses,setCourses] =useState([])
    const [instructors,setInstructors] =useState([])
    const [loading,setLoading] = useState(true)
    const [value, setValue] = useState(0);
    const [cert ,setCert] = useState([])
    const [ref,setRef] = useState([])
    const [ongoing,setOnGoing] =useState([])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  


    const x = [1,3]
    useEffect(()=>{
      if(auth.user.type=="individual"){
        setLoading(true)
        let cancel
        axios({
            method:"GET",
            url : `/Individual/myCourses/${auth.user.id}`,
            cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
            
            setLoading(false)
            setMyCourses(res.data.myCourses)
            setCourses(res.data.courses)
            setInstructors(res.data.instructors)
            setCert(res.data.myCourses.courseInfo.filter((course => (course.certificate!=""))))
            setRef(res.data.myCourses.courseInfo.filter((course => (course.refund.set==true))))
            setOnGoing(res.data.myCourses.courseInfo.filter((course => (course.certificate=="" &&( course.refund.set!=true||
              (course.refund.set==true && course.refund.state=="rejected"))))))
           

            setLoading(false)
        }).catch(e=>{
           
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
      }

        else if(auth.user.type=="corporate"){
          setLoading(true)
          let cancel
          axios({
              method:"GET",
              url : `/Corporate/myCourses/${auth.user.id}`,
              cancelToken: new axios.CancelToken (c => cancel = c)
          }).then (res => {
              
              setLoading(false)
              setMyCourses(res.data.myCourses)
              setCourses(res.data.courses)
              setInstructors(res.data.instructors)
              setCert(res.data.myCourses.courseInfo.filter((course => (course.certificate!=""))))
              setOnGoing(res.data.myCourses.courseInfo.filter((course => (course.certificate==""))))
             
  console.log(res.data.myCourses.courseInfo)
              setLoading(false)
          }).catch(e=>{
             
              if(axios.isCancel(e)) return 
          })
          return () => cancel ()

      }
    }, [])
  
    
    return(
        <TraineeMyCourses.Provider value={{ myCourses,setMyCourses ,courses,setCourses,instructors,setInstructors,cert ,setCert,ref,setRef
          ,ongoing,setOnGoing}}>

<Box sx={{  width: "100%" }}>
      <AppBar position="fixed" sx={{pt:"3%!important",backgroundColor:"white",boxShadow:"none",mb:"2rem",pb:"1rem",top:{xl:"5.8rem",
      lg:"6.9rem",md:"5.8rem",sm:"5.8rem",xs:"4rem"},
      boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"}}>
      
        <StyledTabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="All My Courses" {...a11yProps(0)} />
          <StyledTab label="Ongoing Courses" {...a11yProps(1)} />
          <StyledTab label="Certified Courses" {...a11yProps(2)} />
         {auth.user.type=="individual" &&
          <StyledTab label="Refund Requests" {...a11yProps(3)} />}
         
        </StyledTabs>
        </AppBar>

        {loading && <Loading sx={{top:"l"}}/>}

        {!loading && myCourses && 
       
      <TabPanel value={value} index={0} sx={{backgroundColor:"white"}}>
      <Stack direction="column" gap={10} marginTop={"4em"}>
        
        {  myCourses.length==0 ? <></>  : myCourses.courseInfo.map(c=>{
             return <OneCourseResult myCourse={c} courses={courses} />
         })}
         </Stack>
      </TabPanel>}


      {!loading && cert && 
      <TabPanel value={value} index={2}>
      <Stack direction="column" gap={10} marginTop={"4em"}>
        
        {cert.length==0 ?  <NoCourse message={"You have no Certified Courses"}/> : cert.map(c=>{
            return <OneCourseResult myCourse={c} courses={courses} />
        })}
          </Stack>
      </TabPanel>}

      {!loading && ongoing &&
      <TabPanel value={value} index={1}>
      <Stack direction="column" gap={10} marginTop={"4em"}>
        
        {ongoing.length==0 ?  <NoCourse message={"You have no Ongoing Courses"}/> : ongoing.map(c=>{
            return <OneCourseResult myCourse={c} courses={courses} />
        })}
          </Stack>
      </TabPanel>}

      {!loading && ref &&
      <TabPanel value={value} index={3}>
      <Stack direction="column" gap={10} marginTop={"4em"}>
        
        {ref.length==0 ? <NoCourse message={"You have no Refund Requests"}/> : ref.map(c=>{
            return <OneCourseResult myCourse={c} courses={courses} />
        })}
          </Stack>
      </TabPanel>}
  
    </Box>





       
        {/* {!loading && myCourses && myCourses.courseInfo.length>0 &&
      

      
        <>
        <Box width="75%" position="relative" left="12.5%">
            <Stack direction="row" alignItems={"flex-start"} gap={1}>  
                <BookIcon sx={{color:"#bbd2b1",fontSize:"2rem"}}/>
        <h2 style={{padding:"0rem 0rem 3rem"}}>My Courses </h2>
        </Stack>
        </Box>
        
        <Stack direction="column" gap={10} >
        
       {  myCourses.courseInfo.map(c=>{
            return <OneCourseResult myCourse={c} courses={courses} />
        })}
        </Stack>
        </>
        } */}
        </TraineeMyCourses.Provider>
    )

}
export default MyCourses