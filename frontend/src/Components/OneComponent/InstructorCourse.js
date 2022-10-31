import './OneCourseResult.css'
import {Link} from 'react-router-dom'
function InstructorCourse ({Onecourse}) {
    return (
        <div className = "course-card">
            <ul> 
                <li>
               <h3>{Onecourse.title}</h3>
                <p>{Onecourse.subject}</p>
                <p>{Onecourse.rating}</p>
                <p>{Onecourse.price}</p>
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