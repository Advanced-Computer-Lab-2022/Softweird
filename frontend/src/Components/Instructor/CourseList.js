import {useContext, useEffect,useState} from 'react'
import InstructorCourse from '../OneComponent/InstructorCourse'
import {SearchInstructor} from '../../Context/SearchInstructor'
import {FilterSearch} from '../../Context/FilterSearch'
import {Currency} from '../../Context/Currency'
import { Box,Stack } from '@mui/material'
import Loading from '../OneComponent/Loading'
import SearchBarCourses from './SearchBarCourses'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar,Typography } from "@mui/material"

import { styled } from "@mui/material"
import DialogAllDiscs from './DialogAllDiscs'
import NoCourse from '../OneComponent/NoCourseInst'

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
      style={{paddingLeft:"27%"}}
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


function CourseList () {
    const {courses,setCourses,loading,setLoading} = useContext(SearchInstructor)
    const {subject , setSubject ,price , setPrice} = useContext(FilterSearch)
    const [value,setValue] = useState(0)
   const [ published,setPublished] = useState([])
    const [deleted,setDeleted] =useState([])
    const[inProgress,setInProgress] =useState([])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  useEffect(()=>{
    setPublished(courses.filter((c => (!c.Deleted && c.Finished ))))
    setDeleted(courses.filter((c => (c.Deleted ))))
    setInProgress(courses.filter((c => !(c.Finished ))))

  },[courses])

  var length = subject.length!==0  ?(courses.filter((course => (subject.includes(course.subject)) &&
  (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
  +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
  +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
  ))).length: (courses.filter((course =>
  (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
  +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
  +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
  ))).length
    
return (
  <>
<Box >
      <AppBar position="fixed" sx={{pt:"3%!important",backgroundColor:"white",boxShadow:"none",mb:"2rem",pb:"1rem",top:{xl:"5.8rem",
      lg:"7rem",md:"5.8rem",sm:"5.8rem",xs:"4rem"},
      boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"}}>
      
        <StyledTabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="All My Courses" {...a11yProps(0)} />
          <StyledTab label="Published Courses" {...a11yProps(1)} />
          <StyledTab label="Inprogress Courses" {...a11yProps(2)} />
          <StyledTab label="Deleted Courses" {...a11yProps(3)} />
        </StyledTabs>
        <SearchBarCourses/>  
        </AppBar>
  <Stack direction="row">  
 
  
         <Box flex={3}  position={"relative"} marginTop={"5rem"} width={"90%"}>
        
         {courses.length===0  && !loading ? <NoCourse message={"There are no courses"}/>:
        <></> }
    
        <ul style={{display:"flex" , flexDirection:"column" , gap:"4rem",width:"98%" }} >

      <TabPanel value={value} index={0}>
        <Stack gap={"4rem"}>
        {courses.length!==0 && subject.length!==0  
       && (courses.filter((course => (subject.includes(course.subject))  &&
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
       ))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
          {courses.length!==0 && subject.length==0  
       && (courses.filter((course =>
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
       ))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
          </Stack>
     </TabPanel> 

     <TabPanel value={value} index={1}>
     <Stack gap={"4rem"}>
        {published.length!==0 && subject.length!==0  
       && (published.filter((course => (subject.includes(course.subject)) &&
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
       ))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
        {published.length!==0 && subject.length===0 && (published.filter((course => 
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
       ))) 
       .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
        
          </Stack>
          {published.length==0 && <NoCourse message={"You have no Published Course"}/>}
     </TabPanel> 

     
     <TabPanel value={value} index={2}>
     <Stack gap={"4rem"}>
        {inProgress.length!==0 && subject.length!==0  
       && (inProgress.filter((course => (subject.includes(course.subject)) &&
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
       ))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
          {inProgress.length!==0 && subject.length==0  
       && (inProgress.filter((course => 
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
       ))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
          </Stack>
          {inProgress.length==0 && <NoCourse message={"You have no Inprogress Course"}/>}
     </TabPanel> 

     <TabPanel value={value} index={3}>
     <Stack gap={"4rem"}>
        {deleted.length!==0 && subject.length!==0  
       && (deleted.filter((course => (subject.includes(course.subject)) &&
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
          {deleted.length!==0 && subject.length==0  
       && (deleted.filter((course => 
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
          </Stack>
          {deleted.length==0 && <NoCourse message={"You have no deleted Course"}/>}
     </TabPanel> 
</ul> 
</Box> 

</Stack>

</Box>
<DialogAllDiscs/>
</>
)
}
export default CourseList


