
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
import {useNavigate} from 'react-router-dom'

function NavInstructor () {
  const auth =useAuth()
  const navigate = useNavigate()
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  var color = 'black'
  console.log(color)
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
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
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
        <MenuItem>
          <Avatar/> My Profile
        </MenuItem>
        <MenuItem>
        <WalletIcon sx={{marginRight:"8px" ,marginLeft:"-4px", color:"#bdbdbd" , fontSize:"1.9rem"}}/>
           My Wallet
        </MenuItem>
        <MenuItem>
        <LibraryBooksIcon sx={{marginRight:"8px" ,marginLeft:"-4px", color:"#bdbdbd" , fontSize:"1.9rem"}}/>
           My Courses On System
        </MenuItem>
        <MenuItem>
        <PendingIcon sx={{marginRight:"8px" ,marginLeft:"-4px", color:"#bdbdbd" , fontSize:"1.9rem"}}/>
           Pending Courses to Publish
        </MenuItem>
        
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ReportProblemIcon fontSize="small" />
          </ListItemIcon>
          Report a problem
        </MenuItem>
       
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
export default NavInstructor