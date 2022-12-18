import {Outlet,Navigate} from 'react-router-dom'
import {useAuth} from '../Components/auth'
const InstructorRoutes=()=>{
    const auth= useAuth() 
 
    return(
        auth.user ?(auth.user.type=='instructor'? <Outlet/>:<Navigate to="/login"/>):<Navigate to="/login"/>
    )
}
export default InstructorRoutes