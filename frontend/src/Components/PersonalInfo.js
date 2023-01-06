import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import React, {useContext,useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BadgeIcon from '@mui/icons-material/Badge';
import Rating from '@mui/material/Rating';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Divider from '@mui/material/Divider';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import './PersonalInfo.css'
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import isEmail from 'validator/lib/isEmail';
import CardMedia from '@mui/material/CardMedia';
import {Currency} from '../Context/Currency'
import { InstructorProfile } from '../Context/InstructorProfile';
import BusinessIcon from '@mui/icons-material/Business';
import FacebookIcon from '@mui/icons-material/Facebook';
import SavingsIcon from '@mui/icons-material/Savings';
import Wallet from '../Images/wallet.png'
import { useAuth } from './auth';
import { Tooltip } from '@mui/material';
import { Toast } from '../Context/Toast';
  // const params = new URLSearchParams(window.location.search);
  // const userId = params.get('user');
 

  const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  });
const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"#c50d0d"
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



function PersonalInfo() {
const auth =useAuth()
 const {inst, gender, setProfile, setLoading,user,setUser, loading,email,setEmail,setMessage}=useContext(InstructorProfile)
 // const [inst2,setProfile] = useState([]);   
 const {curr , setCurr,rate,setRate} = useContext(Currency)
  const [formData, setFormData] = useState('');
const[errored, setErrored] = useState(false);
const[success,setSucess]=useState(true)
const[empty, setEmpty] = useState(false);
const {setOpenToast} =useContext(Toast)

//const {Email,errorMsg} = formData;

const handleChanged = evt => {
  setErrored(false);
  setSucess(true);
  setEmpty(false)
  setFormData(evt.target.value);
  console.log(evt.target.value);
};



const handleSubmit = evt => {
  evt.preventDefault();


  if(formData=="" || formData==" "){
    setEmpty(true);
    setErrored(false);
    setSucess(false);
  }
  else   if (!isEmail(formData)) { 
    setErrored(true); setSucess(false);
    setEmpty(false);
      } 
    else {
      setLoading(true)
      setErrored(true); setSucess(true);
    setEmpty(false);
    if(window.confirm("Are You sure you want to change your email?")){
      const data = formData

      let cancel
      axios({
          method:"PATCH",
          url : `/updateMyEmail/${auth.user.id}`,  //${inst.user._id}
          data : {email:data},
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
          setLoading(false)
          setEmail(res.data.email)
          setOpenToast(true)
          setMessage("Email updated successfully")
      }).catch(e=>{
          
          if(axios.isCancel(e)) return 
      
      })

      return () => cancel ()
}}
}



 const [open, setOpen] = React.useState(false);

 const handleClickOpen = () => {
   setOpen(true);
   setEmpty(false);
   setErrored(false);
   setSucess(false);
 };
 const handleClose = () => {
  setOpen(false);
};


  return (
    <>
    {!loading && inst && user &&
    <Stack direction={"column"} gap={"4rem"} sx={{paddingBottom:"4%",marginLeft:"6rem",marginRight:"6rem"}}>
<Box sx={{width:'100%', marginTop: '3rem',position:"relative" }}>
      <Card variant="outlined" > <>
  <div className='wire2'></div>
  <div className='pin'></div>
  <Card className="personalInfo" >
    <CardContent sx={{overflow:"auto"}}>
 <Stack direction={"row"} gap={"4rem"} padding="3rem" justifyContent={"center"}>
 <Stack direction={"column"} gap={2} alignItems={'center'} marginTop={"2rem"}> 
 <Avatar src="/static/images/avatar/1.jpg"  diplay="flex"  sx={{ width: 170, height: 170 }}/>
 
    
      </Stack>
      <Divider orientation="vertical" flexItem color={"#d3d3d3"}/>
    <Stack direction={"column"} gap={2} alignSelf={"center"}>
    <Typography sx={{ fontSize: "2rem"}} color="000" >
     {user.fName + " " + user.lName}
      </Typography>
      <Typography sx={{ fontSize: "1.1rem"}} color="000" display="flex" alignItems={"end"}>
      <BadgeIcon sx={{fontSize:"2rem", marginRight:"1rem", color:"#BBD2B1"}}/> { user.username}
      </Typography>
      <Typography sx={{ fontSize: "1.1rem"}} color="000">
      <EmailRoundedIcon sx={{fontSize:"2rem", marginRight:"1rem", color:"#BBD2B1"}}/>  {email}
      <Tooltip title="update email">
      <IconButton  aria-label="edit" onClick={handleClickOpen}>
      <CreateIcon sx={{fontSize:"1.1rem", marginLeft:"1rem", color:"000"}}/>
      </IconButton>
      </Tooltip>
      <Box>

      <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    sx={{maxHeight:"100%"}}
  >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Please enter a New Email
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <TextField
      required = {success}
      error = {errored || empty}
      label="New Email"
      placeholder="New Email"
      sx={{width:"70%",textAlign:"center",fontStyle:"italic"}}
      multiline={true}
      maxRows={2}
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={handleChanged}/>

     {errored && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Please enter a valid email.</p>}
     {empty && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* All fields are required.</p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSubmit} sx={{color:"#c50d0d"}}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>

      </Box>
      </Typography>
      <Typography sx={{ fontSize: "1.1rem"}} color="000">
        
        <div>{ gender ? <FemaleOutlinedIcon sx={{fontSize:"2rem",marginRight:"1rem", color:"#BBD2B1"}}/>  : <MaleOutlinedIcon sx={{fontSize:"2rem", marginRight:"1rem", color:"#BBD2B1"}}/> } {inst.user.gender}</div> 
       
      </Typography>
     <Stack direction={"row"} gap={"1.5rem"} alignItems={"self-end"} >
      <CardMedia
        component="img"
        alt="wallet"
      sx={{ width:"12%",objectFit: "contain"}}
        image={Wallet}
        
      /> 
      {user.type=="instructor" && <Typography fontSize={"1.1rem"}> 
      {inst.amountOwed.$numberDecimal==0 ? "Empty" : inst.amountOwed.$numberDecimal +" " + curr } 
      </Typography>}

      {user.type=="individual" && <Typography fontSize={"1.1rem"}>
      {inst.wallet==0 ? "Empty" : inst.wallet +" " + curr } 
          </Typography>}

       </Stack>
    </Stack>
     
 </Stack>
    </CardContent>
    </Card>
    </></Card>
    </Box>
    </Stack>
    
    }
    </>
    
  );
}
export default PersonalInfo
