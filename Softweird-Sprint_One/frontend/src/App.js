import React from 'react';
import { BrowserRouter as Router , Routes ,Route} from 'react-router-dom'
import WelcomePage from './Pages/WelcomePage';
import Search from './Pages/Search'
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import Courses from './Pages/Courses';
import MyCourses from './Pages/Instructor/MyCourses'
import Filter from './Components/Filter'
import OneCourse from './Pages/OneCourse';
import AddUsers from './Pages/Admin/AddUsers'
import AddCourse from './Pages/Instructor/AddCourse'
import  MakeExam  from './Pages/Instructor/MakeExam';
import Solve from './Pages/individualTrainee/takeExam';
import ModelAnswer from './Pages/individualTrainee/ModelAnswer';
import VGrade from './Pages/individualTrainee/viewGrade';
import ReportAproblem from './Pages/individualTrainee/reportAproblem';
import VReport from './Pages/individualTrainee/viewReports';
import FollowUp from './Pages/individualTrainee/followUp'
import Viewr from './Pages/Admin/vreports';
import SolveR from './Pages/Admin/SolveR';
import AfollowUp from './Pages/Admin/AfollowUp';
import {Currency} from './Context/Currency';
import { useEffect,useState } from "react";

function App() {
  const [curr , setCurr] = useState()
  const [rate , setRate] = useState(1)
  return (
    
    <Router>
      
    
      <Routes>

        <Route path="/" element = {<WelcomePage/>}  exact/>
        <Route path="/Search/:course" element = {<Search/>} />
        <Route path="/Search" element = {<Search/>} />
        <Route path="/Courses/:course_id" element = {<Courses/>} />
        <Route path="/Courses/" element = {<Courses/>} exact/>
        <Route path="Instructor/MyCourses" element = {<MyCourses/>} />
        <Route path="OneCourse/:Onecourse" element = {<OneCourse/>} />
        <Route path="AddUsers/" element = {<AddUsers/>}/>
        <Route path="AddCourse/:inst" element = {<AddCourse/>}/>
        <Route path="/MakeExam" element = {<MakeExam/>}/>
        <Route path="/Solve" element = {<Solve/>}/>
        <Route path="/ModelAnswer" element = {<ModelAnswer/>}/>
        <Route path="/viewGrade" element = {<VGrade/>}/>
        <Route path ="/reportAproblem" element = {<ReportAproblem/>}/>
        <Route path ="/ViewReport" element = {<VReport/>}/>
        <Route path ="/followUp:id" element = {<FollowUp/>}/>
        <Route path ="/Viewr" element = {<Viewr/>}/>
        <Route path ="/solveR:id" element = {<SolveR/>}/>
        <Route path ="/AfollowUp:id" element = {<AfollowUp/>}/>
        </Routes>
      
        </Router>
    
  );
}

export default App;
