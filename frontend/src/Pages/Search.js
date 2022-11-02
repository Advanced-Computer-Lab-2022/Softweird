import SearchReults from "../Components/SearchResults"
import React from 'react'
import {useParams} from "react-router-dom"
import {useState , useContext,useEffect} from 'react'
import Filter from "../Components/Filter"
import {FilterSearch} from '../Context/FilterSearch'

 function Search () {
     const{course} = useParams() 
     const x = (course == undefined? "" : course)
     const [subject , setSubject] = useState([])
     const [price , setPrice] = useState([])
     const [rate , setRate] = useState([])
     const show = true
    return (
        <>
         <FilterSearch.Provider value={{subject , setSubject ,price , setPrice ,rate , setRate}}>
         <h1> Search Results</h1>
         <SearchReults courses={x} />
         <Filter show={show}/>
        </FilterSearch.Provider> 
        </>
    )

}
export default Search