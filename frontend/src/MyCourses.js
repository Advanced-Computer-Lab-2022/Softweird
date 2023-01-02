import {useAuth} from './Components/auth'
import InstructorCourses from './Pages/Instructor/MyCourses'
import TraineeCourses from './Pages/Trainee/MyCourses'

function MyCourses(){
    const auth= useAuth();
    return(
        <>
        {(auth.user.type=='individual' || auth.user.type=='corporate') && <TraineeCourses/>}
        {auth.user.type=='instructor' && <InstructorCourses/>}
        </>
    )
}
export default MyCourses