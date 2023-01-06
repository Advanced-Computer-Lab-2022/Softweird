
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
import { useAuth } from "./auth";

 function SearchResults (props) {
   const auth = useAuth()
   
      const [courses , setCourses] = useState ([])
      const [myCourse , setMyCourses] = useState ([])
      const [loading , setLoading] = useState(true)
      const {subject , setSubject ,price , setPrice ,rate , setRate} = useContext(FilterSearch)
      var length = subject.length!==0  ?(courses.filter((course => (subject.includes(course.subject)) &&
      (rate.includes(Math.ceil(course.rating.$numberDecimal))) && (course.Finished==true && course.Deleted!=true) &&
      (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
      +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
      +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
      ))).length: (courses.filter((course =>(rate.includes(Math.ceil(course.rating.$numberDecimal)))  &&
      (course.Finished==true && course.Deleted!=true) &&
      (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
      +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
      +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
      ))).length
     courses.map(c=>
      console.log(typeof price[1]))
      useEffect(() =>{
         setLoading(true)
          let cancel
          axios({
              method:"GET",
              url : "/Search/search",
              params : {input:props.courses,id:(auth.user!=undefined?auth.user.id:undefined),
                type:(auth.user ?auth.user.type:undefined)},
              cancelToken: new axios.CancelToken (c => cancel = c)
              
          }).then (res => {
              setLoading(false)
              setCourses(res.data.course)
              setMyCourses(res.data.myCourse)
              console.log(res.data.myCourse)
              
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
         {props.search==false ?
         <h2 style={{padding:"0rem 2rem 3rem"}}>Courses ({length})</h2>:
         <h2 style={{padding:"0rem 2rem 3rem"}}>SearchResults ({length})</h2>}

        <ul style={{display:"flex" , flexDirection:"column" , gap:"4rem" }}>
        {subject.length!==0  ?  (courses.filter((course => (subject.includes(course.subject)) &&
        (rate.includes(Math.ceil(course.rating.$numberDecimal))) &&
         (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
         +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price)>=price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
         +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price)<=price[2]))
         )))
        .map ( course =>{
       return course.Finished==true && course.Deleted!=true && <div key= {course._id}>
             <OneCourseResult Onecourse={course} myCourse={myCourse} />
        </div>
    }) 
       : (courses.filter((course =>(rate.includes(Math.ceil(course.rating.$numberDecimal))) &&
       (course.price==price[0]||(parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) >= price[1]&&parseInt(((100-(parseFloat(course.promotionInst.value.$numberDecimal)
       +parseFloat(course.promotionAdmin.value.$numberDecimal)))/100)*course.price) <= price[2]))
       )))
       .map ( course =>{
      return course.Finished==true && course.Deleted!=true &&<div key= {course._id}> 
            <OneCourseResult Onecourse={course} myCourse={myCourse} />
       </div>
   })  }
    <Pagination /></ul> 
    </>}
    {loading &&<> 
    <Loading /></>
  }
  </Box>
  </>
      )

  }
  export default SearchResults;