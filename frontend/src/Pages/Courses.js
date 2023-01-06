import SearchReults from "../Components/SearchResults"
import {useParams , useLocation} from "react-router-dom"
import Filter from "../Components/Filter"
import {FilterSearch} from '../Context/FilterSearch'
import {useState} from 'react'
import { Stack,Box } from "@mui/material"

 function Courses () {
    const{course_id} = useParams() 
    const [subject , setSubject] = useState([])
    const [price , setPrice] = useState([])
    const [rate , setRate] = useState([])
    const show = true
    return (
        <>
      <Box height="100%">
         <FilterSearch.Provider value={{subject , setSubject ,price , setPrice ,rate , setRate}}>
         <Stack  direction="row" position={"relative"} >
         <Filter show={show} />
         <SearchReults courses="" search={false} />
         </Stack>
        </FilterSearch.Provider> 
        
        </Box>
        </>
        
         
    )

}
export default Courses



