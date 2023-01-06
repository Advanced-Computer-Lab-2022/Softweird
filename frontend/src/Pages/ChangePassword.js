import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import validator from 'validator';
import { Navigate } from 'react-router-dom';
import { useNavigate,useParams } from "react-router-dom";
import logo1 from '../Images/LogoShortRed.png'
import { Stack } from '@mui/material';

function ChangePassword() {
	const {id}=useParams();
    const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate();
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

	const [formData, setFormData] = useState({
		Password: '',
		ConfirmPassword: '',
		successMsg: false,
		errorMsg: false,
		loading: false,
	});
	const {
		Password,
		ConfirmPassword,
		successMsg,
		errorMsg,
		loading,
	} = formData;
	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleChange = evt => {
		if(evt.target.name=="Password")
		setErrorMessage("")
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
	
		// client-side validation
		if (
			isEmpty(Password) ||
			isEmpty(ConfirmPassword) 
		) {
			setFormData({
				...formData,
				errorMsg: 'All fields are required',
			});
		} else if(Password!== ConfirmPassword){
            setFormData({
                successMsg: false,
                errorMsg: "Password Mismatch",
                loading: false,
                
            });
            console.log("passwords");}
            else {
			const {Password, ConfirmPassword } = formData;
			const data = {Password, ConfirmPassword };
			setFormData({ ...formData, loading: false });

            let cancel
            axios({
                method:"PATCH",
                url : `/updateMyPass/${id}`,
                data : {password:Password},
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
               
               const response = res.data
             
                 setFormData({
                    Email: '',
                    Password: '',
                    successMsg: true,
                    errorMsg: false,
                    loading: false,
                });
				navigate('/login')
              
               
            
            }).catch(e=>{
                    setFormData({
                        successMsg: false,
                        errorMsg: "An Error occured try again",
                        loading: false,
                    });
                   
                if(axios.isCancel(e)) return 
            })
            return () => cancel ()
		}
		navigate('/login')
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
                <div className="form-content" >
                    <div className="form-items" style={{minWidth: "550px"}}>
					<Stack direction="row" justifyContent={"space-between"}>
						<Stack>
                        <h3>Change Password</h3>
                        <p style={{color:"grey",paddingTop:"0.5rem"}}>Fill in the data below.</p>
						</Stack>
						<div className='text-end' style={{width:"13%"}}>
						<img src={logo1} style={{width:"100%"}}/>
                        </div>
						</Stack>


		{successMsg && <p  style={{color:"red" , margin:"0",fontSize:"0.8rem",paddingLeft:"1rem"}}> Password Changed Successful</p>}
        {loading && <p  style={{color:"red" , margin:"0",fontSize:"0.8rem",paddingLeft:"1rem"}}> Loading</p>}
        {errorMsg==="All fields are required" && <p  style={{color:"red" , margin:"0",fontSize:"0.8rem",paddingLeft:"1rem"}}>*All fields are required</p>}
        {/* {errorMsg==="invalid id" && <p> *invalid id</p>} */}
        {errorMsg==="An Error occured try again" && <p  style={{color:"red" , margin:"0",fontSize:"0.8rem",paddingLeft:"1rem"}}> *An Error occured try again</p>}
        {errorMsg==="Password Mismatch" && <p  style={{color:"red" , margin:"0",fontSize:"0.8rem",paddingLeft:"1rem"}}> *Password Mismatch</p>}


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
					placeholder='Create new password'
					type={paswo}
					onChange={handleChange}
                    onInput={(e) => validate(e.target.value)}></input> 
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                    <br />
                    
			</div>
			<div className='form-group input-group'>
			{errorMessage === '' ? null :
                    <div style={{fontSize:12,
                      color: 'red',marginLeft:"4%"
                    }}> *{errorMessage}</div>}</div>
            {/* password */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-lock'></i>
						
					</span>
				</div>
				<input
					name='ConfirmPassword'
					value={ConfirmPassword || ''}
					className='form-control'
					placeholder='Confirm new password'
					type={paswo}
					onChange={handleChange}/> 
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
			</div>
            <p>

            </p>
			  <div className='form-group text-end'>
				<button type='submit' className='btn btn-primary btn-block'style={{position:'relative'}}>
					Change Password
				</button>
			</div></div>
			<p></p>
        </div>
		</div></form>
        <p></p>
        </>
	)
	}
export default ChangePassword;