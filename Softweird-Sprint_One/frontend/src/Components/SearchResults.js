
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import OneCourseResult from './OneComponent/OneCourseResult'
import {useContext} from 'react'
import {FilterSearch} from '../Context/FilterSearch'

 function SearchResults (props) {
      const [courses , setCourses] = useState ([])
      const [loading , setLoading] = useState(true)
      const {subject , setSubject ,price , setPrice ,rate , setRate} = useContext(FilterSearch)
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
              props.Result=res.data
          }).catch(e=>{
              if(axios.isCancel(e)) return 
          })
          return () => cancel ()
          

      }, [props.courses])



      return (
          <>
          {!loading &&
        <ul>
        {subject.length!==0  ?  (courses.filter((course => (subject.includes(course.subject)) &&
        (rate.includes(Math.ceil(course.rating))))))
        .map ( course =>{
       return <div key= {course._id}>
             <OneCourseResult Onecourse={course} />
        </div>
    })
       : (courses.filter((course =>(rate.includes(Math.ceil(course.rating))))))
       .map ( course =>{
      return <div key= {course._id}>
            <OneCourseResult Onecourse={course} />
       </div>
   })  }
    </ul>  }
    {loading && "loading"}
</>
      )
  }
  export default SearchResults;