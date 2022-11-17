import './OneCourseResult.css'
import {Link} from 'react-router-dom'
import {Currency} from '../../Context/Currency'
import {useContext} from 'react'
function InstructorCourse ({Onecourse}) {
    const {curr,setCurr,rate,setRate} = useContext(Currency)
    return (
        <div className = "course-card">
            <ul> 
                <li>
               <h3>{Onecourse.title}</h3>
                <p>{Onecourse.subject}</p>
                <p>{Onecourse.rating}</p>
                <p>{Onecourse.price * rate} {curr}</p>
                <p>{Onecourse.promotionInst.set}</p>
                <p>{Onecourse.promotionAdmin.set}</p>
                <p>{Onecourse.enrolledStudents}</p>
                <p>{Onecourse.totalHours}</p>
                
                
                </li>
            </ul>
            

        </div>
    )
}

    export default InstructorCourse