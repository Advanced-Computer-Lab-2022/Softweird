
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import OneCourseResult from './OneComponent/OneCourseResult'
import {useContext} from 'react'
import {FilterSearch} from '../Context/FilterSearch'
import { Box } from "@mui/system";
import Pagination from './OneComponent/Pagination'
import Loading from './OneComponent/Loading'
import VerticalNav from "./VerticalNav";

 function SearchResults (props) {
      const [courses , setCourses] = useState ([])
      const [loading , setLoading] = useState(true)
      const {subject , setSubject ,price , setPrice ,rate , setRate} = useContext(FilterSearch)
      console.log(courses)
      var length = subject.length!==0  ?(courses.filter((course => (subject.includes(course.subject)) &&
      (rate.includes(Math.ceil(course.rating.$numberDecimal)))))).length: (courses.filter((course =>(rate.includes(Math.ceil(course.rating.$numberDecimal)))))).length
      useEffect(() =>{
         setLoading(true)
          let cancel
          axios({
              method:"GET",
              url : "/Search/search",
              params : {input:props.courses},
              cancelToken: new axios.CancelToken (c => cancel = c)
              
          }).then (res => {
              setLoading(false)
            setCourses(res.data)
          }).catch(e=>{
              if(axios.isCancel(e)) return 
          })
          return () => cancel ()
          

      }, [props.courses])

      return (
        <>
        
        <Box flex={3}  position={"relative"} >
          {!loading &&
           <>
          <h2 style={{padding:"0rem 2rem 3rem"}}>SearchResults ({length})</h2>
        <ul style={{display:"flex" , flexDirection:"column" , gap:"4rem" }}>
        {subject.length!==0  ?  (courses.filter((course => (subject.includes(course.subject)) &&
        (rate.includes(Math.ceil(course.rating.$numberDecimal))))))
        .map ( course =>{
       return <div key= {course._id}>
             <OneCourseResult Onecourse={course} />
        </div>
    }) 
       : (courses.filter((course =>(rate.includes(Math.ceil(course.rating.$numberDecimal))))))
       .map ( course =>{
      return <div key= {course._id}> 
            <OneCourseResult Onecourse={course} />
       </div>
   })  }
    <Pagination /></ul> 
    </>}
    {loading &&<> 
    <h2 style={{padding:"0rem 2rem 3rem"}}>SearchResults</h2>
    <Loading /></>
  }
  </Box>
  </>
      )

  }
  export default SearchResults;