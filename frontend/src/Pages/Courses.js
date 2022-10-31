import SearchReults from "../Components/SearchResults"
import {useParams , useLocation} from "react-router-dom"
import Filter from "../Components/Filter"
import {FilterSearch} from '../Context/FilterSearch'
import {useState} from 'react'


 function Courses () {
    const{course_id} = useParams() 
    const [subject , setSubject] = useState([])
    const [price , setPrice] = useState([])
    const [rate , setRate] = useState([])
    const show = true
    return (
        <>
        {course_id==undefined && 
        <>
        <FilterSearch.Provider value={{subject , setSubject ,price , setPrice ,rate , setRate}}>
        <h1> All Courses </h1>
        <SearchReults courses="" /> 
        <Filter show={show}/>
        </FilterSearch.Provider> 
        </>
        }
        </>
        
         
    )

}
export default Courses



