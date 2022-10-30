import React from "react";
import './styling.css'
import { useEffect,useState } from "react";
import axios from "axios"
import Subtitle from "../Components/Subtitle";

function OneCourse (props){
    const [course, setCourse]= useState()
    const [instructor, setInstructor] = useState()
    useEffect(() =>{
        let cancel
         axios({
             method:"GET",
             url : `/courses/${props.oneCourse._id}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {

            setCourse(res.data.course)
            setInstructor(res.data.instructor)

         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
         

     }, [])
    return (
        <div>
            <div className = 'upper'>
                <h1 className= 'title'>{course.title}</h1>
                <h3 className='price'>{course.price}</h3>
                <h3 className='price'> {course.totalHours} </h3>
                <h3 className='price'> {course.enrolledStudents}</h3>
            </div>
        
            <h3 className= 'subject'>{course.subject}</h3>

            <div className = 'ratings'>
                <h3 className= 'rate'>{course.rating}</h3>
                <h3 > {course.numberRating} </h3>
            </div>

            <h3 className='summ'> {course.summary}</h3>
           <h3 className='preview'>{course.preview}</h3>

           <div className='instructor'>
                <h3 className='space'>{instructor.fName} {instructor.lName}</h3>
                <h3 >{instructor.rating}</h3>
           </div>

           <h3 className='preview'>{instructor.biography}</h3>
           
           <div className= 'subtitle'>
           {course.subtitles.map ( subtitle =>{
                return <div key= {subtitle._id}>
             <li > <Subtitle subtitle = {subtitle}/></li>

        </div>
    })}

                   
            </div>
           
        </div>
        
    )
}
export default OneCourse
