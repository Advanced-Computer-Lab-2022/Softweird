import {useContext} from 'react'
import InstructorCourse from '../OneComponent/InstructorCourse'
import {SearchInstructor} from '../../Context/SearchInstructor'
import {FilterSearch} from '../../Context/FilterSearch'
import {Currency} from '../../Context/Currency'

function CourseList () {
    const {courses,setCourses} = useContext(SearchInstructor)
    const {subject , setSubject ,price , setPrice} = useContext(FilterSearch)
   
return (
<ul>
        {courses.length===0 && <h3>You have no Courses in system</h3> }
        {courses.length!==0 && subject.length!==0  
       && (courses.filter((course => (subject.includes(course.subject))))) 
        .map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> })}
        {courses.length!==0 && subject.length===0 && (courses.map ( course =>{
        return <div key= {course._id}> 
          <InstructorCourse Onecourse={course} />
          </div> }))}

</ul> 
)
}
export default CourseList