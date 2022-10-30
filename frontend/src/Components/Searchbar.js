import React from 'react';
import { useState } from 'react';
import useSearch from '../Hooks/useSearch'
import Search from '../Pages/Search'
import {createSearchParams, Link} from 'react-router-dom'


 function Searchbar() {
     const [searchInput,setSearchInput] = useState('')
     const{courses,loading} = useSearch(searchInput)
    function handleSearch (e) {
      setSearchInput(e.target.value)
    }
  
    return (
        
    <>
        <nav className="navbar bg-light">
         <div className="container-fluid">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} /> 
             <Link to = '/Search' 
               state={{
                 id: searchInput
               }}
             >
                <button className="btn btn-outline-success" type="submit">Search</button>
              </Link>
                 </form>
             </div>
               </nav>
          <ul>
          {courses.map ( course =>{
         return <div key= {course._id}>
               <li >{course.title}</li>
  
          </div>
      })}
      </ul>  
   </>
      
    );
  }
  
  export default Searchbar;