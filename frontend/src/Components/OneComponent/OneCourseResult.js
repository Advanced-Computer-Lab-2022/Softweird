import './OneCourseResult.css'
import {Link} from 'react-router-dom'
function OneCourseResult ({Onecourse}) {
    return (
        <div className = "course-card">
            <ul> 
                <li>
                <Link to ={{
               pathname : `/Courses/${Onecourse._id}` ,
               state:{stateParam :true}
             }}>
               <h3>{Onecourse.title}</h3>
              </Link> 
                <p>{Onecourse.subject}</p>
                <p>{Onecourse.instructor}</p>
                <p>{Onecourse.totalHours}</p>
                <p>{Onecourse.price}</p>
                <p>{Onecourse.rating}</p>
                </li>
            </ul>
            

        </div>
    )
}
export default OneCourseResult