import { useEffect } from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useAuth} from '../Components/auth'
const UsersRoutes=()=>{
    const auth= useAuth() 
    console.log(auth,"jj")
    
    return(
      auth.user ?<Outlet/>:<Navigate to="/login"/>
    )
}
export default UsersRoutes