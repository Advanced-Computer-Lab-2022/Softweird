import {useAuth} from './Components/auth'
import InstProfile from './Pages/Instructor/MyProfile'
import IndivProfile from './Pages/Trainee/IndivProfile'
import CorpProfile from './Pages/Trainee/CorpProfile'
import AdminProfile from './Pages/Admin/MyProfile'

function MyProfile(){
    const auth= useAuth();
    console.log(auth.user.type)
    return(
        <>
   
        {(auth.user.type=='individual' ) && <IndivProfile/>}
        {auth.user.type=='instructor' && <InstProfile/>}
        {auth.user.type=='corporate' && <CorpProfile/>}
        {auth.user.type=='admin' && <AdminProfile/>}
        </>
    )
}
export default MyProfile