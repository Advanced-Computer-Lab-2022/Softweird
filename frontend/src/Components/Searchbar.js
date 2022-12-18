import React from 'react';
import { useState , useRef} from 'react';
import useSearch from '../Hooks/useSearch'
import Search from '../Pages/Search'
import {Link} from 'react-router-dom'
import { AppBar, styled, Typography ,Box, Avatar,Stack} from "@mui/material"
import { Toolbar } from "@mui/material"
import { ThemeContext } from "@emotion/react"
import { borderRadius, fontWeight } from "@mui/system"
import { InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from "@mui/material"
import PublicIcon from '@mui/icons-material/Public';
import { Container } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Coding from '../Images/Coding.jpg'
import { ClickAwayListener } from '@mui/material';

const StyledToolbar = styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between"

})

const SearchStyled =styled("div")(({theme}) => ({
    backgroundColor:"white",
    padding:"0 10px",
    borderRadius:theme.shape.borderRadius,
    width:"25%",
    position:"relative",
    


}));
const SearchIconWrapper = styled('IconButton')(({ theme }) => ({

    height: '100%',
    position: 'absolute',
    color:"#fff",
    backgroundColor:"#bbd2b1",
    borderRadius:theme.shape.borderRadius,
    right:0
    
  }));

 function Searchbar() {

     const [searchInput,setSearchInput] = useState('')
     const [close,setClose]=useState(false)
     const{courses,loading} = useSearch(searchInput)
     const ref = useRef(null)
    function handleSearch (e) {
      setSearchInput(e.target.value);
      setClose(false)
    }
    function handleClick (e) {
      setSearchInput("")
      
    }
    return (
        
    <ClickAwayListener onClickAway={()=>{setClose(true)}} >
                <SearchStyled position={"relative"} sx={{width:"19rem"}}>
                 <IconButton  onClick={() => window.location.href=`/Search?search=${searchInput}`}
                 sx={{position:"absolute" , height:"100%",backgroundColor:"#bbd2b1",right:0,borderRadius:"3px",
                 "&:hover":{
                  cursor: "pointer",
                  
                  
                  }}}>
        
                <SearchIcon sx={{color:"white",
               "&:hover":{
                cursor: "pointer",
                color:"#bbd2b1"
                }}}/>
              </IconButton>
                 
                
      <InputBase  sx={{width:"88%"}}placeholder="Search For Courses"  onChange={handleSearch} value={searchInput} />
                   

      {!close && courses.length!=0 && <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',position:"absolute",top:"2.5rem",left:0,maxHeight:"50vh",overflow:"auto"}}>
      {courses.map ( course =>{
         return  <>
         <ListItem key={course._id} sx={{"&:hover":{
           boxShadow:" 1px 0.5px 1px grey",
           cursor:"pointer"
         }}} 
         onClick={() => window.location.href=`/Courses/${course.title}`}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={Coding} />
        </ListItemAvatar>
        <Stack>
        <ListItemText
         
          primary={
           
              <Typography
                sx={{fontSize:"1.2rem",margin:0}}
                component="span"
                
                color="text.primary"
              >
                {course.title}
              </Typography>
          }
        />
         <ListItemText
         
         primary={
          
             <Typography
             sx={{margin:0}}
               component="span"
            
               color="grey"
             >
               {course.subject}
             </Typography>
         }
       />
       </Stack>
      </ListItem>
      
      <Divider variant="inset" component="li" />
      
      </>})}
   </List>}
    </SearchStyled>
        {/* <nav className="navbar">
         <div className="container-fluid">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
            onChange={handleSearch} value={searchInput}/> 
             <Link to ={{
               pathname : `/Search/${searchInput}` ,
               state:{stateParam :true}
             }}>
                <button className="btn btn-outline-success" type="submit" onClick = {handleClick}>Search</button>
              </Link>
                 </form>
             </div>
               </nav>
          <ul>
          {courses.map ( course =>{
         return <div key= {course._id}>
               <li >{course.title} , {course.subject}</li>
  
          </div>
      })}
      </ul>   */}
   </ClickAwayListener>
      
    );
  }
  
  export default Searchbar;