import {SearchInstructor} from '../../Context/SearchInstructor'
import SearchBarCourses from '../../Components/Instructor/SearchBarCourses'
import InstructorCourse from '../../Components/OneComponent/InstructorCourse'
import {useContext,useState} from 'react'
import { createContext } from 'react'
import {useParams , Link} from 'react-router-dom'
import CourseList from '../../Components/Instructor/CourseList' 
import Filter from "../../Components/Filter"
import {FilterSearch} from '../../Context/FilterSearch'
import { Stack } from '@mui/material'
function MyCourses () {
   const [courses,setCourses] = useState([]) 
   const [subject , setSubject] = useState([])
    const [price , setPrice] = useState([])
    const [rate , setRate] = useState([])
    return(
        <>
        <FilterSearch.Provider value={{subject , setSubject ,price , setPrice ,rate , setRate}}>
        <SearchInstructor.Provider value = {{courses,setCourses}}>
        <Stack  direction="row" position={"relative"} >
        <Filter show={false}/>
        <CourseList />
        </Stack>
        </SearchInstructor.Provider> 
        </FilterSearch.Provider>
       
        </>
    )
}
export default MyCourses