import {useAuth} from './Components/auth'
import InstructorCourses from './Pages/Instructor/OneOfMyCourses'
import TraineeCourses from './Pages/Trainee/OneOfMyCourses'

function MyCourse(){
    const auth= useAuth();
    return(
        <>
        {(auth.user.type=='individual'||auth.user.type=='corporate') && <TraineeCourses/>}
        {auth.user.type=='instructor' && <InstructorCourses/>}
        </>
    )
}
export default MyCourse