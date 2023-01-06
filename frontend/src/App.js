import React from 'react';
import { BrowserRouter as Router , Routes ,Route} from 'react-router-dom'
import WelcomePage from './Pages/WelcomePage';
import Search from './Pages/Search'
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import Courses from './Pages/Courses';
// import MyCourses from './Pages/Instructor/MyCourses'
import Filter from './Components/Filter'
import OneCourse from './Pages/OneCourse';
import AddAdmin from './Pages/Admin/AddAdmin'
import AddCorporate from './Pages/Admin/AddCorporate'
import AddInstructor from './Pages/Admin/AddInstructor'
import AddCourse from './Pages/Instructor/AddCourse '
import {Currency} from './Context/Currency'
import { useEffect,useState } from "react";
import OneCourseResult from './Components/OneComponent/OneCourseResult';
import { Container } from '@mui/system';
import OneOfMyCourses from './Pages/Instructor/OneOfMyCourses'
import VerticalNav from './Components/VerticalNav';
import TraineeCourses from './Pages/Trainee/OneOfMyCourses'
import SignUp from './Pages/SignUp'
import ChangePassword from './Pages/ChangePassword'
import Login from './Pages/Login'
import { AuthProvider } from './Components/auth';
import InstructorTraineeRoutes from './utils/InstructorTrainee';
import AdminRoutes from './utils/AdminRoutes'
import InstructorRoutes from './utils/InstructorRoutes';
import TraineeRoutes from './utils/TraineeRoutes';
import MyCourse from './MyCourse'
import Error from './Pages/Error'
import {Toast} from './Context/Toast'
import Pay from './Components/OneComponent/Pay';
import Aa from './Components/Trainess/OneCourseResult'
import MyCoursesInd from './Pages/Trainee/MyCourses'
import ReportAProblem from './Components/ReportAProblem'
import MyCourses from './MyCourses'
import Reports from './Pages/Reports'
import RefundRequests from './Pages/Admin/RefundRequests'
import AccessRequests from './Pages/Admin/AccessRequests'
import FollowUp from './Components/FollowUp'
import ReportsPage from './Pages/Admin/ReportsPage';
import UsersRoutes from './utils/UsersRoutes';
import MyProfile from './MyProfile';
import ChangePasswordInst from './Pages/ChangePasswordInst'
import ViewInstr from './Pages/ViewInstr '

function App() {
  const [curr , setCurr] = useState()
  const [rate , setRate] = useState(1)
  const [openToast,setOpenToast] = useState(false)
  return (
    <AuthProvider>
    <Router>
       <Currency.Provider value={{curr , setCurr ,rate,setRate}}>
       <Toast.Provider value={{openToast,setOpenToast}} >
      <Routes>
      <Route element={<Navbar/>}> 
   
        <Route index path="/" element = {<WelcomePage/>}  exact/>
        <Route path="/Search" element = {<Search/>} />
        <Route path="Courses/:coursetitle" element = {<OneCourse/>} />
        <Route path="Course/:coursetitle" element = {<OneCourse/>} />
        <Route path="/Courses/" element = {<Courses/>} exact/>
        <Route path="/Course/" element = {<Courses/>} exact/>

        <Route element={<UsersRoutes />} >
          <Route path='/MyProfile' element= {<MyProfile/>}></Route>
        </Route>


        <Route element={<InstructorTraineeRoutes/>}>
        <Route path="/MyCourses" element = {<MyCourses/>}/>
        <Route path="/MyCourse" element = {<MyCourses/>}/>
        <Route path='/MyCourses/:coursetitle' element={<MyCourse/>}/>
        <Route path='/MyCourse/:coursetitle' element={<MyCourse/>}/>
        <Route path="reports" element={<Reports/>} />
       </Route>


       <Route element={<InstructorRoutes/>}>
       <Route path="AddCourse" element = {<AddCourse/>}/>
       </Route>


        <Route element={<AdminRoutes/>}>
        <Route path="AddAdmin/" element = {<AddAdmin/>}/>
        <Route path="AddCorporate/" element = {<AddCorporate/>}/>
        <Route path="AddInstructor/" element = {<AddInstructor/>}/>
        <Route path="RefundRequests/" element={<RefundRequests />}/>
       <Route path="AccessRequests/" element={<AccessRequests />}/>
       <Route path="ReportsPage/" element={<ReportsPage />}/>
       </Route>


       <Route path="*" element = {<Error/>}/>
  
      
       
        </Route>
        
      
        <Route path="SignUp/" element = {<SignUp/>}/>
        <Route path="Login/" element = {<Login/>}/>
        <Route path="ChangePassword/:id" element = {<ChangePassword/>}/>
        <Route path="ChangePasswordInst/:id" element = {<ChangePasswordInst/>}/>
        
       

       
       
        </Routes>
      

        
        
        </Toast.Provider>
        </Currency.Provider>
        </Router>
        </AuthProvider>
  );
}

export default App;
