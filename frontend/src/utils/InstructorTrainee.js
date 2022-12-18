import { useEffect } from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useAuth} from '../Components/auth'
const InstructorTraineeRoutes=()=>{
    const auth= useAuth() 
    console.log(auth)
    
    return(
      auth.user ? (auth.user.type!="admin" ? <Outlet/>:<Navigate to="/login"/>):<Navigate to="/login"/>
    )
}
export default InstructorTraineeRoutes