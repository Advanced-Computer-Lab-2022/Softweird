import {Outlet,Navigate} from 'react-router-dom'
import {useAuth} from '../Components/auth'
const TraineeRoutes=()=>{
    const auth= useAuth() 
 
    return(
        auth.user ?((auth.user.type=='individual' || auth.user.type=='corporate')? <Outlet/>:<Navigate to="/login"/>):<Navigate to="/login"/>
    )
}
export default TraineeRoutes