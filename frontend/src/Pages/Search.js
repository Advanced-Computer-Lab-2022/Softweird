import SearchReults from "../Components/SearchResults"
import React from 'react'
import {useParams} from "react-router-dom"
import {useState , useContext,useEffect} from 'react'
import Filter from "../Components/Filter"
import {FilterSearch} from '../Context/FilterSearch'
import { Stack } from "@mui/system"
import { styled } from '@mui/material/styles'; 
import {Box} from '@mui/system'
import VerticalNav from "../Components/VerticalNav"
import { Grid } from "@mui/material"


const StyledBox = styled(Box)({
    position:"sticky"

})
 function Search () {
    const params = new URLSearchParams(window.location.search);
    const course = params.get('search');
     const x = (course == undefined? "" : course)
     const [subject , setSubject] = useState([])
     const [price , setPrice] = useState([])
     const [rate , setRate] = useState([])
     const show = true
    return (
        <Box >
         <FilterSearch.Provider value={{subject , setSubject ,price , setPrice ,rate , setRate}}>
         <Stack  direction="row" position={"relative"} >
         <Filter show={show} />
         <SearchReults courses={x} />
         </Stack>
        </FilterSearch.Provider> 
        
        </Box>
    )

}
export default Search