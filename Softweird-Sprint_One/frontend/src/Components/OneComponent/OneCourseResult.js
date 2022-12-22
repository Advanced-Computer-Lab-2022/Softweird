import './OneCourseResult.css'
import {Link} from 'react-router-dom'
import {Currency} from '../../Context/Currency'
import {useContext} from 'react'
import { useEffect,useState } from "react";
function OneCourseResult ({Onecourse}) {
    const {curr , setCurr ,rate,setRate} = useContext(Currency)
    return (
        <div className = "course-card">
            <ul> 
                <li>
                <Link to ={{
               pathname : `/OneCourse/${Onecourse._id}` ,
               state:{stateParam :true}
             }}>
               <h3>{Onecourse.title}</h3>
              </Link> 
                <p>{Onecourse.subject}</p>
                <p>{Onecourse.instructor}</p>
                <p>{Onecourse.totalHours}</p>
                <p>{Onecourse.price * rate} {curr}</p>
                <p>{Onecourse.rating}</p>
                </li>
            </ul>
            

        </div>
    )
}
export default OneCourseResult