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
import {Currency} from './Context/Currency'
import { useEffect,useState } from "react";

function App() {
  const [curr , setCurr] = useState()
  const [rate , setRate] = useState(1)
  return (
    
    <Router>
       <Currency.Provider value={{curr , setCurr ,rate,setRate}}>
      <Navbar />
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
      
        </Routes>
        </Currency.Provider>
        </Router>
    
  );
}

export default App;
