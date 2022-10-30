import React from 'react';
import { BrowserRouter as Router , Routes ,Route} from 'react-router-dom'
import WelcomePage from './Pages/WelcomePage';
import Search from './Pages/Search'
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import Courses from './Pages/Courses';
import AddUsers from './Pages/Admin/AddUsers'
import AddCourse from './Pages/Instructor/AddCourse';


function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element = {<WelcomePage/>}  exact/>
        <Route path="/Search/:course" element = {<Search/>} />
        <Route path="/Courses" element = {<Courses/>} />
        <Route path="/admin/addUser" element = {<AddUsers/>} />
        <Route path="/addcourse/" element = {<AddCourse/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
