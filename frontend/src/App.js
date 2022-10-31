import React from 'react';
import { BrowserRouter as Router , Routes ,Route} from 'react-router-dom'
import WelcomePage from './Pages/WelcomePage';
import Search from './Pages/Search'
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import Courses from './Pages/Courses';
import MyCourses from './Pages/Instructor/MyCourses'
import Filter from './Components/Filter'
import OneCourse from './Pages/Instructor/OneCourse';


function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element = {<WelcomePage/>}  exact/>
        <Route path="/Search/:course" element = {<Search/>} />
        <Route path="/Search" element = {<Search/>} />
        <Route path="/Courses/:course_id" element = {<Courses/>} />
        <Route path="/Courses/" element = {<Courses/>} exact/>
        <Route path="Instructor/MyCourses" element = {<MyCourses/>} />
        <Route path="Instructor/OneCourse/:Onecourse" element = {<OneCourse/>} />

      </Routes>
    </Router>
    
  );
}

export default App;
