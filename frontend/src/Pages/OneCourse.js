import React from "react";
import './styling.css'
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import Subtitle from "../Components/OneComponent/Subtitle";
import {Currency} from '../Context/Currency'
import {useContext} from 'react'

 
function OneCourse (){
    const [course, setCourse]= useState([])
    const [instructor, setInstructor] = useState()
    const{Onecourse} = useParams() 
    const[loading , setLoading]=useState(true)
    const {curr , setCurr,rate,setRate} = useContext(Currency)
    useEffect(() =>{
        setLoading(true)
        let cancel
         axios({
             method:"GET",
             url : `/Courses/${Onecourse}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
            setCourse(res.data.course)
            setInstructor(res.data.instructor[0])
            

         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
         

     }, [])
    return (
        <div> 
            {loading==false && 
            <>
                <div className = 'upper'>
                    <h1 className= 'title'>{course.title}</h1>
                   <h3 className='price'>{course.price * rate} {curr}</h3>
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
                    <h3 className='space'>{instructor.user.fName} {instructor.user.lName}</h3>
                    <h3 >{instructor.rating}</h3>
            </div>

           <h3 className='preview'>{instructor.biography}</h3>
            
            <div className= 'subtitle'>
            {course.subtitles && course.subtitles.map ( subtitle =>{
                    return <div key= {subtitle._id}>
                <li > <Subtitle subtitle = {subtitle}/></li>

            </div>
        })}</div>
        </>
            }
            {loading && 'loading..'}
        </div>
    )
}
export default OneCourse
