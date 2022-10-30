import React from "react";
import { useEffect,useState,useLocation } from "react";
import axios from "axios"


 function Search () {
     const location = useLocation();
      const [courses , setCourses] = useState ([])
      const [loading , setLoading] = useState(true)
      useEffect(() =>{
         setLoading(true)
          let cancel
          axios({
              method:"GET",
              url : "/search",
              params : {input:location.state.id},
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

      return (
          <>
          <h1>dd</h1>
        <ul>
        {courses.map ( course =>{
       return <div key= {course._id}>
             <li >{course.title}</li>

        </div>
    })}
    </ul>  
</>
      )
  }
  export default Search;