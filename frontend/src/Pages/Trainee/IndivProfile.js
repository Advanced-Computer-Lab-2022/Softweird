import axios from 'axios';
import React,{ useState, useEffect, useContext, useRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import validator from 'validator';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardDetails from '../../Components/CardDetails ';
import PersonalInfo from '../../Components/PersonalInfo';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {Divider} from '@mui/material';
import {AppBar} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../Components/auth';
import {InstructorProfile} from '../../Context/InstructorProfile'
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
    const [loading,setLoading]=useState(true)
    const [pass, setPass] = useState([]);
    const [pass2, setPass2] = useState([]);
    const [errored, setError] = useState(false);
    const [error, setErrored] = useState(false);   //Password strong
    const [success,setSucess]=useState(true)
    const [empty, setEmpty] = useState(false);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref4 = useRef(null);
    const auth= useAuth();
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [inst,setProfile] = useState([]);  
    const [user, setUser] = useState([]);
    const [gender, setGender] = useState(false);
    const theme = useTheme();
    const [formData, setFormData] = useState('');
    const [email,setEmail] =useState("")
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
      const handleChangePass = evt => {
        setEmpty(false);
        setSucess(true);
        setError(false);
        setErrored(false);
       setPass(evt.target.value);
        
      };
      const handleChangePass2 = evt => {
        setEmpty(false);
        setSucess(true);
        setError(false);
        setErrored(false);
        setPass2(evt.target.value);
      
       };

       const handleConfirm = evt => {
        if(pass ==""|| pass==" " || pass2=="" || pass2==" "){
          setEmpty(true);
          setSucess(false);
        }
        else if (!validator.isStrongPassword(pass, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
          setErrored(true)
        } 
             else if(pass != pass2){
              setError(true);
              setSucess(false);
    
            }
              else{
              
             if(window.confirm("Are You sure you want to change your password")){
                setError(false);
                setSucess(true);
                setEmpty(false);
                setErrored(false);
              evt.preventDefault();
              setOpen(false)
                  setLoading(true)
                  const data = pass
                  console.log(data, "yess")
                  let cancel
                  axios({
                      method:"PATCH",
                      url : `Individual/updateMyPass/${auth.user.id}`,
                      data : {password:data},
                      headers : {'Content-Type' : 'application/json'},
                      cancelToken: new axios.CancelToken (c => cancel = c)
                  }).then (res => {
                    //setLoading(false)
                    setLoading(false)
                    setUser(res.data)
                    setOpenToast(true)
                    setMessage("email updated successfully")
                    setShowPassword(false)
                  }).catch(e=>{
                      console.log(e)
                       if(axios.isCancel(e)) return 
                       
                  
                  })
            
                  return () => cancel ()
            }}
          }

          const handleChange = (event, newValue) => {
          
              setValue(newValue);
            };
      
  
            useEffect(() =>{
                setLoading(true)
               
                let cancel
                 axios({
                     method:"GET",
                     url : `Individual/getProfile/${auth.user.id}`,
                     cancelToken: new axios.CancelToken (c => cancel = c)
                 }).then (res => {
                
                     setLoading(false)
                     setProfile(res.data)
                     setEmail(res.data.user.email)
                     setUser(res.data.user)
                    
                     if(res.data.user.gender==="Female"){
                      setGender(true)
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
              };
        

            
    const handleClose = () => {
                setOpen(false);
                setOpenEdit(false);
                setEmpty(false);
                setSucess(true);
                setError(false);
                setErrored(false);
                setShowPassword(false)
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
                   { inst && !loading && user &&
                   <InstructorProfile.Provider value={{inst,gender, setProfile, setLoading,user,setUser, loading ,email,setEmail,setMessage}}>
                  
                    <AppBar position="fixed" sx={{pt:"3%!important",backgroundColor:"white",boxShadow:"none",mb:"2rem",pb:"1rem",top:{xl:"5.8rem",
                    lg:"6.8rem",md:"6.8rem",sm:"5.8rem",xs:"4rem"},
                    boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"}}>
                 
                 <StyledTabs
               centered
                   value={value}
                   onChange={handleChange}
                   aria-label="styled tabs example">
                    
                     <StyledTab sx={{ paddingRight:"5%"}}  label="Personal Info" onClick={() => scrollDown(ref1)}/> 
                     <StyledTab sx={{ paddingRight:"5%"}}  label="Security" onClick={() => scrollDown(ref2)}/> 
                <StyledTab sx={{paddingRight:"5%"}}  label="Card Details" onClick={() => scrollDown(ref4)}/>
                
                 </StyledTabs>
                 </AppBar>

        <Stack direction={"column"} position={"relative"} sx={{marginTop:'12%'}} >
       
       <div ref={ref1}>
       <PersonalInfo />
         </div>
         <div ref={ref2} >
       
       <Divider sx={{ fontSize: "1.5rem", paddingBottom:"2rem"}} >Security</Divider>
 
       <div   >
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
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChangePass}
            required = {success}
            error = {empty || error || errored} 
            fullWidth
            autoComplete='new-password'
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
     {errored && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Confirmation password doesn't match!!</p>}
     {error && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Password is weak, Use 8 or more characters with a mix of letters, numbers & symbols </p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleConfirm} sx={{color:"#c50d0d"}}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>

 </div>
 </div>
 <div ref={ref4}>
     <CardDetails  />
     </div>
 </Stack>

<ToastMess message={message} />
         </InstructorProfile.Provider>
            }
            {loading &&<Loading /> }
            
                </>
                     
                );
}



export default MyProfile