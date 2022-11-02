import React from 'react';
import { useState , useRef} from 'react';
import useSearch from '../Hooks/useSearch'
import Search from '../Pages/Search'
import {Link} from 'react-router-dom'


 function Searchbar() {

     const [searchInput,setSearchInput] = useState('')
     const{courses,loading} = useSearch(searchInput)
     const ref = useRef(null)
    function handleSearch (e) {
      setSearchInput(e.target.value)
    }
    function handleClick (e) {
      setSearchInput("")
    }
    return (
        
    <>
        <nav className="navbar">
         <div className="container-fluid">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
            onChange={handleSearch} value={searchInput}/> 
             <Link to ={{
               pathname : `/Search/${searchInput}` ,
               state:{stateParam :true}
             }}>
                <button className="btn btn-outline-success" type="submit" onClick = {handleClick}>Search</button>
              </Link>
                 </form>
             </div>
               </nav>
          <ul>
          {courses.map ( course =>{
         return <div key= {course._id}>
               <li >{course.title} , {course.subject}</li>
  
          </div>
      })}
      </ul>  
   </>
      
    );
  }
  
  export default Searchbar;