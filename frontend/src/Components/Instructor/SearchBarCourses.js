
import 'font-awesome/css/font-awesome.min.css';
import {useState , useEffect} from 'react'
import {useContext} from 'react'
import axios from 'axios'
import {SearchInstructor} from '../../Context/SearchInstructor';
import Loading from '../OneComponent/Loading';
import './Search.css'
import {useAuth} from '../auth'

import React from 'react';
import {   useRef} from 'react';

import {Link} from 'react-router-dom'
import { styled} from "@mui/material"

import { InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

import { Container } from "@mui/material"
import IconButton from '@mui/material/IconButton';






const SearchStyled =styled("div")(({theme}) => ({
    backgroundColor:"#f1f1f1",
    padding:"0 10px",
    borderRadius:theme.shape.borderRadius,
    width:"25%",
    position:" absolute",
    width: "14rem",
    right: "33px",
    top:"45px"
    


}));
const SearchIconWrapper = styled('IconButton')(({ theme }) => ({

    height: '100%',
    position: 'absolute',
    color:"#fff",
    backgroundColor:"#bbd2b1",
    borderRadius:theme.shape.borderRadius,
    right:0
    
  }));



function SearchBarCourses () {
    const auth= useAuth()
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    const a = search ==null ? "":search
    const[searchInput,setSearchInput]=useState(a)
    const {courses,setCourses,loading,setLoading} = useContext(SearchInstructor)

 

    function handleSearch (e) {
        setSearchInput(e.target.value)
      }
      useEffect(() =>{
        setLoading(true)
         let cancel
         axios({
             method:"GET",
             url : "/Instructor/myCourses",
             params : {value:searchInput , instructor: auth.user.id},
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
             setCourses(res.data)
            
             
             console.log(res.data)
         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
         
     
     }, [])
    return(
        <>
        {/* <form>
        <input type="text" placeholder="Search.." name="search" value={searchInput}  onChange={handleSearch}/>
        <Link to ={{
               pathname : `/MyCourses/${searchInput}` , // add link instructor id 
               state:{stateParam :true}
             }}>
        <button type="submit"  ><i className="fa fa-search" onChange={handleSearch} ></i> </button>
        </Link>
    </form> */}



    {/* <button class="btn-search" ><i class="fa fa-search" onClick={()=> window.location.href=`/MyCourses?search=${searchInput}`} ></i></button>
    <input type="text" class="input-search" placeholder="Search for your courses" value={searchInput}  onChange={handleSearch} />
    

    
    */}


                <SearchStyled position={"relative"} sx={{width:"14rem"}}>
                 <IconButton  onClick={()=> window.location.href=`/MyCourses?search=${searchInput}`}
                 sx={{position:"absolute" , height:"100%",backgroundColor:"#bbd2b1",right:0,borderRadius:"3px",
                 "&:hover":{
                  cursor: "pointer",
                  color:"#bbd2b1",
                  backgroundColor:"#f1f1f1"

                  
                  
                  }}}>
        
                <SearchIcon sx={{color:"white",
               "&:hover":{
                cursor: "pointer",
                color:"#bbd2b1",
              
                }}}/>
              </IconButton>
                 
                
      <InputBase  sx={{width:"88%",color:"black",fontSize:"0.8rem",fontWeight:"bold"}}placeholder="Search For Courses"  onChange={handleSearch} value={searchInput} />
              

 </SearchStyled>


        </>
    )
}
export default SearchBarCourses