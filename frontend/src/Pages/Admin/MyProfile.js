import axios from 'axios';
import React,{ useState, useEffect, useContext, useRef } from 'react';
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
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {AppBar} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import BusinessIcon from '@mui/icons-material/Business';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import validator from 'validator';
import { useAuth } from '../../Components/auth';
import ToastMess from '../../Components/OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Loading from '../../Components/OneComponent/Loading';

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
function MyProfile (){
    const [value, setValue] = useState(0);
    const[loading,setLoading]=useState(true)
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [inst,setProfile] = useState([]);  
    const[gender, setGender] = useState(false);
    const theme = useTheme();
    const[error, setError] = useState(false);   //Password strong
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [formData, setFormData] = useState('');
    const[errored, setErrored] = useState(false);
    const[success,setSucess]=useState(true)
    const[empty, setEmpty] = useState(false);
    const auth= useAuth();
    const [message,setMessage] =useState('')
    const {setOpenToast} = useContext(Toast)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {console.log(showPassword);
      setShowPassword(!showPassword)};
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const scrollDown = (ref) => {
        if(ref===ref1){
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
        else{
          window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth',
          });
        }
       
      };
      
      const handleChange = (event, newValue) => {
          
              setValue(newValue);
            };
      
      

 useEffect(() =>{
                setLoading(true)
               
                let cancel
                 axios({
                     method:"GET",
                     url : `Admin/getMyProfile/${auth.user.id}`,
                     cancelToken: new axios.CancelToken (c => cancel = c)
                 }).then (res => {
                
                     setLoading(false)
                     setProfile(res.data)
          
                     if(res.data.gender==="Female"){
                      setGender(true);
                     }
                     console.log(res.data)
                    
                 }).catch(e=>{
                  console.log(e);
                     if(axios.isCancel(e)) return 
                 })
                 return () => cancel ()
             }, []);
             
     const handleClickOpen = () => {
          setOpen(true);
          setEmpty(false);
          setSucess(true);
          setError(false);
          setErrored(false);
       };


    const handleOpen=()=>{
      setEmpty(false);
      setErrored(false);
      setSucess(true);
      setOpenEdit(true);
    }

    const handleChangePass = evt => {
      setEmpty(false);
      setSucess(true);
      setError(false);
      setErrored(false);
     setPass(evt.target.value);
      console.log(pass, "ana pass")
    };
    const handleChangePass2 = evt => {
      setEmpty(false);
      setSucess(true);
      setError(false);
      setErrored(false);
      setPass2(evt.target.value);
      console.log(pass, "ana pass2222")
     };

   
          const handleChangeEmail = evt => {
            setErrored(false);
            setSucess(true);
            setEmpty(false)
            setFormData(evt.target.value);
            
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
                setErrored(false); setSucess(true);
              setEmpty(false);
              if(window.confirm("Are You sure you want to change your email?")){
                const data = formData
                setOpenEdit(false);
                let cancel
                axios({
                    method:"PATCH",
                    url : `Admin/updateMyEmail/${auth.user.id}`,  //${inst.user._id}
                    data : {email:data},
                    headers : {'Content-Type' : 'application/json'},
                    cancelToken: new axios.CancelToken (c => cancel = c)
                }).then (res => {
                    setLoading(false)
                    setProfile(res.data)
                    setOpenToast(true)
                       setMessage("Email updated successfully")
                    console.log(res.data)
                }).catch(e=>{
                    
                    if(axios.isCancel(e)) return 
                
                })
          
                return () => cancel ()
          }}
          }

          const handleConfirm = evt => {
            if(pass == "" || pass== " " || pass2== "" || pass2== " " ){
              setEmpty(true);
              setError(false)
              setErrored(false)
              setSucess(false);
            }
            else if (!validator.isStrongPassword(pass, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
              setErrored(true)
              setEmpty(false);
              setError(false)
              setSucess(false);
            } 
              else if(pass !== pass2){
                  setError(true);
                  setSucess(false);
                  setErrored(false)
                  setEmpty(false);
                }
                  else{
                
                 if(window.confirm("Are You sure you want to change your password")){
                    setError(false);
                    setSucess(true);
                    setEmpty(false);
                    setErrored(false);
                    setOpen(false)
                  evt.preventDefault();
                 
                      setLoading(true)
                      const data = pass
                      console.log(data, "yess")
                      let cancel
                      axios({
                          method:"PATCH",
                          url : `Admin/updateMyPass/${auth.user.id}`,
                          data : {password:data},
                          headers : {'Content-Type' : 'application/json'},
                          cancelToken: new axios.CancelToken (c => cancel = c)
                      }).then (res => {
                       setOpenToast(true)
                       setMessage("Password updated successfully")
                        setLoading(false)
                        setProfile(res.data)
                        
                      }).catch(e=>{
                          console.log(e)
                           if(axios.isCancel(e)) return 
                           
                      
                      })
                
                      return () => cancel ()
                }}
              }
            
    const handleClose = () => {
                setOpen(false);
                setOpenEdit(false);
               
              };

   
     const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
                ({ theme }) => ({
                  textTransform: 'none',
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: theme.typography.pxToRem(15),
                  marginRight: theme.spacing(1),
                  color: '000',
                  '&.Mui-selected': {
                    color: '#000000',
                  },
                  '&:hover': {
                    color: '#bbd2b1',
                    opacity: 1,
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: 'rgba(100, 95, 228, 0.32)',
                  },
                }),
              );
          
              
          
      const StyledTabs = styled((props) => (
                  <Tabs
                    {...props}
                    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
                  />
                ))({
                  '& .MuiTabs-indicator': {
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    paddingRight:'4%',
                  },
                  '& .MuiTabs-indicatorSpan': {
                    maxWidth: '50%',
                    width: '100%',
                    backgroundColor: '#bbd2b1',
                  },
                });

    return (
                    <>
                   { inst && !loading  &&
                <>
                  
                    <AppBar position="fixed" sx={{pt:"3%!important",backgroundColor:"white",boxShadow:"none",mb:"2rem",pb:"1rem",top:{xl:"5.8rem",
                    lg:"6.8rem",md:"6.8rem",sm:"5.8rem",xs:"4rem"},
                    boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"}}>
                 
                 <StyledTabs
               centered
                   value={value}
                   onChange={handleChange}
                   aria-label="styled tabs example">
                    
                     <StyledTab sx={{ paddingRight:"5%"}}  label="Personal Info" onClick={() => scrollDown(ref1)}/> 
                     <StyledTab sx={{ paddingRight:"5%"}} label="Security" onClick={() => scrollDown(ref2)}/> 
               
                
                 </StyledTabs>
                 </AppBar>

        <Stack direction={"column"} position={"relative"} sx={{marginTop:'12%'}} >
       
       <div ref={ref1}>

       <Stack direction={"column"} gap={4} sx={{paddingBottom:"4%", marginLeft:"6rem", marginRight:"6rem"}}>
<Box sx={{width:'100%', marginTop: '3rem', position:"relative"}}>
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
     {inst.fName + " " + inst.lName}
      </Typography>
      <Typography sx={{ fontSize: "1.2rem"}} color="000" display="flex" alignItems={"end"}>
      <BadgeIcon sx={{fontSize:"2rem", marginRight:"0.5rem", color:"#BBD2B1"}}/> { inst.username}
      </Typography>
      <Typography sx={{ fontSize: "1.2rem"}} color="000">
      <EmailRoundedIcon sx={{fontSize:"2rem", marginRight:"0.5rem", color:"#BBD2B1"}}/>  {inst.email}
      <IconButton  aria-label="edit" onClick={handleOpen}>
      <CreateIcon sx={{fontSize:"1.2rem", marginLeft:"1rem", color:"000"}}/>
      
      </IconButton>
      <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={openEdit}
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
      onChange={handleChangeEmail}/>

     {errored && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Please enter a valid email.</p>}
     {empty && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* All fields are required.</p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSubmit} sx={{color:"#c50d0d"}}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>

      </Typography>
      <Typography sx={{ fontSize: "1.1rem"}} color="000" display="flex" alignItems={"end"}>
        
      <div>{ gender ? <FemaleOutlinedIcon sx={{fontSize:"2rem",marginRight:"0.5rem", color:"#BBD2B1"}}/>  : <MaleOutlinedIcon sx={{fontSize:"2rem", marginRight:"0.5rem", color:"#BBD2B1"}}/> } {inst.gender}</div> 

       
      </Typography>
    </Stack>
     
 </Stack>
    </CardContent>
    </Card>
    </></Card>
    </Box>
    </Stack>
         </div>
         <div ref={ref2} >
       
       <Divider sx={{ fontSize: "1.5rem", paddingBottom:"2rem"}} >Security</Divider>
 
       <div paddingLeft={'21'}  >
       <Stack direction={"row"} gap={5} sx={{alignItems:"center", paddingBottom:"2%",justifyContent:"center"}}>
         
          
         <Button variant="outlined" onClick={handleClickOpen} startIcon={ <LockIcon sx={{fontSize:"1.2rem", color:'#bbd2b1'}}/>} 
          sx={{color:"#000" , border:"1px solid rgba(187, 210, 177, 0.8)" ,
          '&:hover':{
           border:"1px solid rgba(187, 210, 177)" 
          }}}> 
         
     Change Password
   </Button>
         </Stack>
     
         <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    sx={{maxHeight:"100%"}}
  >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Change Password
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
     <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">* Password</InputLabel>
          <Input
           autoComplete='new-password'
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChangePass}
            required = {success}
            error = {empty || error || errored} 
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">* Confirm Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChangePass2}
            fullWidth
            required = {success}
            error = {empty || error || errored} 
          
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

     {empty && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* All fields are required.</p>}
     {error && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Confirmation password doesn't match!!</p>}
     {errored && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Password is weak, Use 8 or more characters with a mix of letters, numbers & symbols </p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleConfirm} sx={{color:"#c50d0d"}}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>

 </div>
 </div>

 </Stack>
<ToastMess message={message} />
   </>
       
            } {loading &&<Loading /> }
                </>
                     
                );
}



export default MyProfile



