import {useContext, useEffect} from 'react'
import InstructorCourse from '../OneComponent/InstructorCourse'
import {SearchInstructor} from '../../Context/SearchInstructor'
import {FilterSearch} from '../../Context/FilterSearch'
import {Currency} from '../../Context/Currency'
import { Box,Stack } from '@mui/material'
import Loading from '../OneComponent/Loading'
import SearchBarCourses from './SearchBarCourses'


function CourseList () {
    const {courses,setCourses,loading,setLoading} = useContext(SearchInstructor)
    const {subject , setSubject ,price , setPrice} = useContext(FilterSearch)
    
   
   
return (
  <>

  <Stack direction="row">     
 
         <Box flex={3}  position={"relative"} >
        
         {courses.length===0  && !loading ? <h2 style={{padding:"0rem 2rem 3rem",fontWeight:"bold"}}>No Courses in the System</h2>:
        <h2 style={{padding:"0rem 2rem 3rem"}}>My Courses</h2> }
    
        <ul style={{display:"flex" , flexDirection:"column" , gap:"4rem" }} >
        
        {courses.length!==0 && subject.length!==0  
       && (courses.filter((course => (subject.includes(course.subject))))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
        {courses.length!==0 && subject.length===0 && (courses.map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> }))}

</ul> 
</Box> 

</Stack>
<SearchBarCourses/>
</>
)
}
export default CourseList


