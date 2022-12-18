import {SearchInstructor} from '../../Context/SearchInstructor'
import SearchBarCourses from '../../Components/Instructor/SearchBarCourses'
import InstructorCourse from '../../Components/OneComponent/InstructorCourse'
import {useContext,useEffect,useState} from 'react'
import { createContext } from 'react'
import {useParams , Link, useLoaderData} from 'react-router-dom'
import CourseList from '../../Components/Instructor/CourseList' 
import Filter from "../../Components/Filter"
import {FilterSearch} from '../../Context/FilterSearch'
import { Stack } from '@mui/material'
import {Toast} from '../../Context/Toast'
import ToastMess from '../../Components/OneComponent/ToastMess'
import { useLocation } from 'react-router-dom'

function MyCourses () {
   const [courses,setCourses] = useState([]) 
   const [subject , setSubject] = useState([])
    const [price , setPrice] = useState([])
    const [rate , setRate] = useState([])
    const {setOpenToast} = useContext(Toast)
    const location = useLocation()
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        if(location.state!=undefined){
        if((location.state.message== "course deleted")){
            setOpenToast(true)
            setMessage("Course Deleted Successfully "+location.state.course)
        }}

    },[])
        return(
        <>
        <FilterSearch.Provider value={{subject , setSubject ,price , setPrice ,rate , setRate}}>
        <SearchInstructor.Provider value = {{courses,setCourses,loading,setLoading}}>
        <Stack  direction="row" position={"relative"} >
        <Filter show={false}/>
        <CourseList />
        </Stack>
        </SearchInstructor.Provider> 
        </FilterSearch.Provider>
        <ToastMess message={message} />
       
        </>
    )
}
export default MyCourses