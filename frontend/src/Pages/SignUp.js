import React, { useContext, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import validator from 'validator';
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
import Loading from '../Components/OneComponent/Loading';
import { useNavigate, useLocation,Navigate } from 'react-router-dom';
import cookie from 'react-cookie';
import {useAuth} from '../Components/auth'
import ToastMess from '../Components/OneComponent/ToastMess';
import { Toast } from '../Context/Toast';
import LogoShortRed from '../Images/LogoShortRed.png'
  import { Stack } from '@mui/material';


function SignUp() {
	const navigate= useNavigate()
    const location =useLocation()
    const redirectPath = location.state?.path || '/'
    const auth= useAuth()
    const {setOpenToast} = useContext(Toast)
	const [agree,setAgree]= useState(false);
	const [open, setOpen] = React.useState(false);
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	  const [taken,setTaken] =useState('')
    const [errorMessage, setErrorMessage] = useState('')
 
  const validate = (value) => {
 
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Strong Password')
    } else {
      setErrorMessage('Password is weak, Use 8 or more characters with a mix of letters, numbers & symbols')
    }
  }
	//const [gender, setGender]=useState();
	const onChange= (e) =>{
		const {name, value, type, checked }=e.target;

		setFormData((state) => ({
			...state,
			[name]:type === "checkbox" ? checked :value
		}));
	}
	const [formData, setFormData] = useState({
        FirstName: '',
		LastName: '',
		Username: '',
		Email: '',
		Password: '',
		ConfrimPassword:'',
		Gender: '',
		successMsg: false,
		errorMsg: false,
		loading: false,
	});

	const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
	};
	const agreeSet=() =>{
		setAgree(true);
	}

    const [page,setPage] =useState("/")
	const {
        FirstName,
		LastName,
		Username,
		Email,
		Password,
		ConfrimPassword,
		Gender,
		successMsg,
		errorMsg,
		loading,
	} = formData;
	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleChange = evt => {
		
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
			successMsg: '',
			errorMsg: '',
		});
	};
	const[eye,seteye]=useState(true);
	const[paswo,setpassword]=useState("password");
	const[type,settype]=useState(false);

	const handleSubmit = evt => {
        evt.preventDefault();
        console.log("form")
        console.log(FirstName)
        console.log(Username)
	

		// client-side validation
		if (
            isEmpty(FirstName) ||
			isEmpty(LastName) ||
			isEmpty(Username) ||
			isEmpty(Email) ||
			isEmpty(Password) ||
            isEmpty(ConfrimPassword)||
			isEmpty(Gender)
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
		}
     else if(Password!== ConfrimPassword){
        setFormData({
			...formData,
            successMsg: false,
            errorMsg: "Password Mismatch",
            loading: false,
            
        });
        console.log("passwords");}
    else if (agree===false){
		setFormData({
			...formData,
            successMsg: false,
            errorMsg: "Please agree to the terms and conditions",
            loading: false,
            
        });
	}
	 else {
			const { FirstName,LastName,Gender,Username, Password,Email } = formData;
			const data = { FirstName,LastName,Gender,Username, Password,Email };
            console.log("dfghg")

			
            let cancel
			setFormData({ ...formData, loading: false });

            axios({
                method:"POST",
                url : "sign/signup",
                data : data,
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
               
               const response = res.data
          console.log(response)
               if (response==="Sign up Successful"){
                 setFormData({
                    FirstName: '',
                    LastName: '',
                    Username: '',
                    Email: '',
                    Password: '',
                    ConfrimPassword:'',
                    Gender: '',
                    successMsg: true,
                    errorMsg: false,
                    loading: false,
                });
				
				navigate('/login')
				setOpenToast(true)
               }
               else if(response === "This email is already signed in"){
				setpassword("password");
			seteye(true);
			settype(false);
                setFormData({
					FirstName: FirstName,
                    LastName: LastName,
                    Username: Username,
                    Email: '',
                    Password: '',
                    ConfrimPassword:'',
                    Gender: Gender,
                    successMsg: false,
                    errorMsg: "This email is already signed in",
                    loading: false,
                });
               }
			   else if(response === "username already taken"){
				setpassword("password");
			seteye(true);
			settype(false);
                setFormData({
					FirstName: FirstName,
                    LastName: LastName,
                    Username: "",
                    Email: Email,
                    Password: '',
                    ConfrimPassword:'',
                    Gender: Gender,
                    successMsg: false,
                    errorMsg: "username taken",
                    loading: false,
                });
               }
            
            }).catch(e=>{
                
                 

                    
                   
                if(axios.isCancel(e)) return 
            })
            return () => cancel ()
		}}

    function handleInst(){
        setPage("/adminAdd/inst")
        console.log("Instructor")
    }
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
	return (
        <>
		<form className='signup-form' onSubmit={handleSubmit} >
		<div className="form-holder">

                <div className="form-content">
                    <div className="form-items">
						<Stack direction="row" justifyContent={"space-between"}>
						<Stack>
                        <h3>Registeration</h3>
                        <p style={{color:"grey",paddingTop:"0.5rem"}}>Fill in the data below.</p>
						</Stack>
						<div className='text-end' style={{width:"13%"}}>
						<img src={LogoShortRed} style={{width:"100%"}}/>
                        </div>
						</Stack>
       
        {loading && <Loading/>}
        {!loading &&
        <>
        {errorMsg==="username taken" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*This Username is already taken</p>}
        {errorMsg==="All fields are required" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*All fields are required</p>}
        {errorMsg==="This email is already signed in" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*This email is already signed in</p>}
		{errorMsg==="Password Mismatch" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*Passwords Mismatch, Please try again!</p>}
		{errorMsg==="Please agree to the terms and conditions" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*Please agree to the terms and conditions</p>}
            {/* firstName */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-user'></i>
					</span>
				</div>
				<input
					name='FirstName'
					value={FirstName || ''}
					className='form-control'
					placeholder='First Name'
					type='text'
					onChange={handleChange}
				/>
			</div>
            {/* lastName */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-user'></i>
					</span>
				</div>
				<input
					name='LastName'
					value={LastName || ''}
					className='form-control'
					placeholder='Last Name'
					type='text'
					onChange={handleChange}
				/>
			</div>
			{/* username */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-address-card'></i>
					</span>
				</div>
				<input
					name='Username'
					value={Username || ''}
					className='form-control'
					placeholder='Username'
					type='text'
					onChange={handleChange}
				/>
			</div>
			{/* email */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
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
					autoComplete='new-password'
					className='form-control'
					placeholder='Create password'
					type={paswo}
					onChange={handleChange}
                    onInput={(e) => validate(e.target.value)}></input> 
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                    <br />
                  
					
				
			</div>
			{errorMessage!=='' &&<div className='form-group input-group'>
			{errorMessage === '' ? null :
                    <div style={{fontSize:12,
                      color: 'red',marginLeft:"4%"
                    }}> *{errorMessage}</div>}</div>}
			{/* confirm password */}
			<div className='form-group input-group'>
				
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-lock'></i>
					</span>
				</div>
				<input
					name='ConfrimPassword'
					value={ConfrimPassword || ''}
					className='form-control'
					placeholder='Confirm password'
					type={paswo}
					onChange={handleChange}/>
					<i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
				
			</div>
            <p > </p>
		{/* gender */}
        <div className='form-group'>
		<h6>Gender: </h6>
            <input 
			name='Gender' type="radio" value="Male" onChange={onChange} />  Male  
            <input style={{margin: "8px"}}
          name='Gender'  type="radio"value="Female"onChange={onChange}/>   Female  
            <input style={{margin: "8px"}}
			name='Gender' type="radio" value="Others" onChange={onChange} /> Others 
         </div>
	   <h3> </h3>

<div style={{marginTop: "22px"}}>
	   <Button variant="outlined" onClick={handleClickOpen} sx={{color:"#c50d0d",backgroundColor:"#fff", border: "1px solid #c50d0d",'&:hover':{
           
           cursor: "pointer",
           color:"#ffffff",
           backgroundColor:"#c50d0d"

       }}}>
	   Payment Terms and Conditions	</Button>
		</div>
<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Terms and Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Read and accept the following Payment Terms and Conditions 
          </DialogContentText>
          <p>

		   Acceptance of Terms and Conditions. By selecting "I accept the eStatement Service Agreement and Disclosure provided"
		   and submitting this registration, you agree that you have read and understood the terms and conditions set forth in this
		   agreement and you accept this agreement without modification. By accepting this agreement, you consent to the electronic
		   delivery of statements and other bank- related documents. You understand that this agreement is effective at the date and
		   time of the bank's receipt of your accepted electronic agreement. If you do not agree to the terms and conditions of this
		   agreement, you should not submit this registration and you will not be enrolled in the Service. 
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"#c50d0d"}}>Done </Button>
        </DialogActions>
		</Dialog>

        
<div>
	<label style={{color: "black"}}>
      <input type="checkbox" style={{marginTop: "22px",marginRight:"0.5rem"}} onChange={agreeSet}  />
	  I agree to the payment terms aand conditions
	  </label>
    </div>

            {/* AddInstructor Button */}
            <div className='form-group'>
				<button type='submit' style={{marginTop: "10%"}} className='btn btn-primary btn-block' onClick={handleSubmit}>
					Sign Up
				</button>
			</div> </>}
            </div>
                

		
        </div>
       
				</div></form>
        <p></p>
    
        </>
	);

	/****************************
	 * RENDERER
	 ***************************/
    };

export default SignUp;