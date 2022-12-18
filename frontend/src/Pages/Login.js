import React, { useState,useContext } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import google from '../Images/google_logo.png';
import facebook from '../Images/facebook.png'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Input } from '@mui/material';
import logo1 from '../Images/Logo.png'
import {useAuth} from '../Components/auth'
import { useNavigate, useLocation,Navigate } from 'react-router-dom';
import cookie from 'react-cookie';
import PropTypes from 'prop-types';
import { styled,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ToastMess from '../Components/OneComponent/ToastMess';
import {Toast} from '../Context/Toast'

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
              color:"#cd0505"
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
  
function Login() {
    const {openToast,setOpenToast} = useContext(Toast)
    const [required,setRequired]=useState(true)
    const [error,setError] = useState(false)
    const [user,setUser]= useState('')
    const auth= useAuth()
    const navigate= useNavigate()
    const location =useLocation()
    const redirectPath = location.state?.path || '/'

	const handleClickOpen = () => {
        setOpen(true);
      };
    
     
	const [open, setOpen] = React.useState(false);
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const [formData, setFormData] = useState({
		Email: '',
		EmailF: '',
		Password: '',
		successMsg: false,
		errorMsg: false,
        popupmsg:false,
		loading: false,
	});
	const {
		Email,
		EmailF,
		Password,
		successMsg,
		errorMsg,
        popupmsg,
		loading,
	} = formData;
	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleChange = evt => {
        setRequired(true)
        setError(false)
		
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
			successMsg: '',
			errorMsg: '',
            popupmsg:'',
		});
        
	};
	const[eye,seteye]=useState(true);
	const[paswo,setpassword]=useState("password");
	const[type,settype]=useState(false);
const handleClose2 = () =>{
    setFormData({
        EmailF: '',
        successMsg: true,
        popupmsg: "",
        errorMsg: '',
        loading: false,
    });
    setOpen(false)
    setRequired(true)
    setError(false)
}
	const handleClose = (evt) => {
       
		evt.preventDefault();
		
			// client-side validation
			if (
				isEmpty(EmailF) 
			) {
				setFormData({
					...formData,
					popupmsg: 'All fields are required',
				});
                setError(true)
                setRequired(false)
			} else if (!isEmail(EmailF)) {
				setFormData({
					...formData,
					popupmsg: 'Invalid email',
				});
                setError(true)
                setRequired(false)
		} else {
				const {EmailF } = formData;
				const data = {EmailF };
				setFormData({ ...formData, loading: true });
	
				let cancel
				axios({
					method:"POST",
					url : "/forgetMyPass",
					data : data,
					headers : {'Content-Type' : 'application/json'},
					cancelToken: new axios.CancelToken (c => cancel = c)
				}).then (res => {
				    const response = res.data
                    
				   if (response.message==="Success"){
                    setOpen(false)
					 setFormData({
						EmailF: '',
						successMsg: "Mail is sent to recover your password",
						errorMsg: false,
						loading: false,
					});
                   setOpenToast(true)
				   }
				   else if(response === "This mail is not registered, please try again"){
					setFormData({
						EmailF: '',
						successMsg: true,
						popupmsg: "This mail is not registered, please try again",
						loading: false,
					});
				   }
				
				}).catch(e=>{
						setFormData({
							successMsg: false,
							errorMsg: "An ERROR occured",
							loading: false,
						});
						console.log(e)
					if(axios.isCancel(e)) return 
				})
				return () => cancel ()
			}}

	const handleSubmit = evt => {
        

        evt.preventDefault();
	
		// client-side validation
		if (
			isEmpty(Email) ||
			isEmpty(Password) 
		) {
			setFormData({
				...formData,
				errorMsg: 'All fields are required',
			});
		} else if (!isEmail(Email)) {
			setFormData({
				...formData,
				errorMsg: 'Invalid email',
			});
    } else {
			const {Email, Password } = formData;
			const data = {Email, Password };
           

			setFormData({ ...formData, loading: true });

            let cancel
            axios({
                method:"POST",
                url : "/sign/login",
                data : data,
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
               
              console.log(res)
               const response = res.data
               if (response.message==="success"){
                 setFormData({
                    Email: '',
                    Password: '',
                    successMsg: "Login Successful",
                    errorMsg: false,
                    loading: false,
                });
                setUser({
                    id:res.data.id,
                    type:res.data.type,
                    name:res.data.name
                 })
                auth.login({
                    id:res.data.id,
                    type:res.data.type,
                    name:res.data.name
                 })
                navigate(redirectPath,{replace:true})
				console.log("here")

               }
               else if(response === "Username or Password is incorrect"){
                setFormData({
                    Email: '',
                    Password: '',
                    successMsg: true,
                    errorMsg: "Username or Password is incorrect",
                    loading: false,
                });
               }
            
            }).catch(e=>{
                    setFormData({
                        successMsg: false,
                        errorMsg: "Username or Password is incorrect",
                        loading: false,
                    });
                   
                if(axios.isCancel(e)) return 
            })
            return () => cancel ()
		}}
			

	const Eye=()=>{
		if(paswo==="password"){
			setpassword("text");
			seteye(false);
			settype(true);
		}
		else{
			setpassword("password");
			seteye(true);
			settype(false);
		}
	}
	/****************************
	 * VIEWS
	 ***************************/
   
    if(auth.user){return <Navigate replace to ='/' />}
	else {
        return (
        <>
        
		<form className='signup-form' onSubmit={handleSubmit} >
		<div className="form-holder">
                <div className="form-content" >
                    <div className="form-items" style={{minWidth: "550px"}}>
					<p>
			<img src={logo1} alt="Logo" style={{position:'relative',left: "19%",
    width: "65%",}} />
			</p>
        <p style={{color:"grey"}}>Fill in the data below.</p>


		
	
        {/* {loading && <p> Loading</p>} */}
        {errorMsg==="All fields are required" && <p style={{color:"red" , marginLeft:"1rem"}}>All fields are required</p>}
        {errorMsg==="This mail is not registered, please try again" && <p style={{color:"red" , marginLeft:"1rem"}}> This mail is not registered, please try again</p>}
		{errorMsg==="Username or Password is incorrect" && <p style={{color:"red" , marginLeft:"1rem"}}> Username or Password is incorrect</p>}
		{errorMsg==="An ERROR occured" && <p> An ERROR occured</p>}

		

			{/* email */}
			<div className='form-group input-group' >
			<div className='input-group-prepend' >
					<span className='input-group-text'>
						<i className='fa fa-envelope'></i>
					</span>
				</div>
				<input
					name='Email'
					value={Email || ''}
					className='form-control'
					placeholder='Email address'
					type='email'
					onChange={handleChange}
				/>
			</div>
			{/* password */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-lock'></i>
						
					</span>
				</div>
				<input
					name='Password'
					value={Password || ''}
					className='form-control'
					placeholder='Enter password'
					type={paswo}
					onChange={handleChange}/> 
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>{/*, left:'80px'*/}
			</div>
			  <div>
	   <Button variant="text" onClick={handleClickOpen} sx={{position:'relative',fontWeight:"bold", top:'10px',color: "white",'&:hover':{color:"#cd0505"}}}>
	   Forget Password? Click here</Button>
       <BootstrapDialog
    onClose={handleClose2}
    aria-labelledby="customized-dialog-title"
    open={open}
  >
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}>
    Forget Password
    </BootstrapDialogTitle>
    <DialogContent  sx={{width:"30rem"}}>
    {popupmsg && <p style={{color:"red" , marginLeft:"1rem"}}>*{popupmsg}</p>}
    <TextField
      required = {required}
      error = {error}
      label="Your Registered Email"
      name='EmailF'
      value={EmailF || ''}
      placeholder="Email Address"
      sx={{width:"70%",textAlign:"center",fontStyle:"italic"}}
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={handleChange}/>
     
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose} sx={{color:"#cd0505"}}>
        send
      </Button>
    </DialogActions>
  </BootstrapDialog>
			  {/* <Dialog open={open} >
        <DialogTitle>Forget Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter your registered Email 
          </DialogContentText>
          <p>
		  <input
					name='EmailF'
					value={EmailF || ''}
					className='form-control'
					placeholder='Email address'
					type='email'
					onChange={handleChange}
				/>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
		</Dialog> */}
			  <div className='form-group'>
				<button type='submit' className='btn btn-primary btn-block'style={{position: "relative", left: "80%",
    marginTop: "3%", fontSize: "1.2rem", paddingLeft: "4.5%", paddingRight: "4.5%",}}>
					Login
				</button>
			</div></div>
			<p></p>
			<Divider orientation="horizontal" flexItem>
    			OR
  				</Divider>

            <p>
			<img src={google} alt="Logo" width={250} height={50} style={{position:'relative', left:'23%', top:'50px'}} />
			</p>
			<p>
			<img src={facebook} alt="Logo" width={280} height={100} style={{position:'relative', left:'20%', top:'10px'}} />
            
			</p>
          
            </div>
                
        </div>
		</div></form>
        <p></p>
        {successMsg==="Mail is sent to recover your password" && <ToastMess message="Mail is sent to recover your password"  />}
        {successMsg==="Login Successful" &&<ToastMess message="Login sucessful"  />}
        </>
	)}
	}
export default Login;