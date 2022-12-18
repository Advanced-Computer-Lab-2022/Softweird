import {Outlet,Navigate} from 'react-router-dom'
import {useAuth} from '../Components/auth'

const AdminRoutes=()=>{
    const auth= useAuth() 
 
    return(
        auth.user ?(auth.user.type=='admin'? <Outlet/>:<Navigate to="/error"/>):<Navigate to="/login"/>
    )
}
export default AdminRoutes