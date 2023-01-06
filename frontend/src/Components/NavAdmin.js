
import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WalletIcon from '@mui/icons-material/Wallet';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PendingIcon from '@mui/icons-material/Pending';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import axios from 'axios'
import {useAuth} from './auth'
import {Navigate, NavLink, useNavigate} from 'react-router-dom'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function NavAdmin () {
  const auth =useAuth()
  const navigate = useNavigate()
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  var color = 'black'
  console.log(color)

  const [opena, setOpena] = React.useState(false);

  const handleClicka = () => {
    setOpena(!opena);
  };

  const [openr, setOpenr] = React.useState(false);

  const handleClickr = () => {
    setOpenr(!openr);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSubmit = evt => {
    evt.preventDefault();

        let cancel
        axios({
            method:"GET",
            url : '/sign/logout',
            headers : {'Content-Type' : 'application/json'},
            cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
           
           const response = res.data
    
           if (response==="Logout Successfull"){
            auth.logout()
            navigate('/')
           }
        
        }).catch(e=>{
        
            console.log("An ERROR OCCURED")
            
            if(axios.isCancel(e)) return 
        
        })
        return () => cancel ()
  
}

    return (
       <>
       
        <Tooltip >
          <Button
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            startIcon = {<Avatar sx={{ width: 32, height: 32 }}>{auth.user.name.slice(0,1)}</Avatar>}
            endIcon = {<KeyboardArrowDownIcon />}
            sx= {{color :"black",textTransform:"none",'&:hover':{boxShadow: "3px 2px 4px 0px rgb(0 0 0 / 7%)"}}}>
            {auth.user.name}
          </Button>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
         PaperProps={{
          elevation: 0,
          sx: {
            minWidth:"14rem",
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink to="MyProfile/"  style={{textDecoration:"none",color:"rgba(0,0,0,0.9)"}}>  
        <MenuItem>
          <Avatar/> My Profile
        </MenuItem>
        </NavLink>
      
       
        <ListItemButton onClick={handleClicka}>
        <ListItemIcon sx={{minWidth:"37px"}}>
         <PersonAddAltIcon />
        </ListItemIcon>
        <ListItemText primary="Add" />
        {opena ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={opena} timeout="auto" unmountOnExit>
      <NavLink to='/addAdmin' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.90)"}}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,pb:"3px",pt:0}}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </List>
        </NavLink>
        <NavLink to='/addInstructor' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.90)"}}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,pb:"3px",pt:0}}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Instructor" />
          </ListItemButton>
        </List>
        </NavLink>
        <NavLink to='/addCorporate' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.90)"}}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,pb:"20px",pt:0}}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Corporate Trainee" />
          </ListItemButton>
        </List>
        </NavLink>
      </Collapse>
      <NavLink to='/ReportsPage' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.90)"}}>
      <MenuItem>
          <ListItemIcon>
            <ReportProblemIcon fontSize="small" />
          </ListItemIcon>
          Reports
        </MenuItem>
        </NavLink>

        <ListItemButton onClick={handleClickr}>
        <ListItemIcon sx={{minWidth:"37px"}}>
         <RequestPageIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
        {openr ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openr} timeout="auto" unmountOnExit>
      <NavLink to='/AccessRequests' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.90)"}}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,pb:"3px",pt:0}}>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
        </List>
        </NavLink>
        <NavLink to='/RefundRequests' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.90)"}}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,pb:"3px",pt:0}}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Refunds" />
          </ListItemButton>
        </List>
        </NavLink>
</Collapse>
        <Divider />
       
       
        <MenuItem onClick={handleSubmit}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
       </>
    )
}
export default NavAdmin