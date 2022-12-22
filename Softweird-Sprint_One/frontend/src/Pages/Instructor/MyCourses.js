import {SearchInstructor} from '../../Context/SearchInstructor'
import SearchBarCourses from '../../Components/Instructor/SearchBarCourses'
import InstructorCourse from '../../Components/OneComponent/InstructorCourse'
import {useContext,useState} from 'react'
import { createContext } from 'react'
import {useParams , Link} from 'react-router-dom'
import CourseList from '../../Components/Instructor/CourseList' 
import Filter from "../../Components/Filter"
import {FilterSearch} from '../../Context/FilterSearch'
function MyCourses () {
   const [courses,setCourses] = useState([]) 
   const [subject , setSubject] = useState([])
    const [price , setPrice] = useState([])
    const [rate , setRate] = useState([])
    return(
        <>
        <FilterSearch.Provider value={{subject , setSubject ,price , setPrice ,rate , setRate}}>
        <SearchInstructor.Provider value = {{courses,setCourses}}>
        <SearchBarCourses />
        <CourseList />
        <Filter show={false}/>
        </SearchInstructor.Provider> 
        </FilterSearch.Provider>
        </>
    )
}
export default MyCourses