import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import validator from 'validator';

//import { showErrorMsg, showSuccessMsg } from '../helpers/alert';
//import { showLoading } from '../helpers/loading';
//import { isAuthenticated } from '../helpers/auth';
//import './AddUsers.css';
//import {StyleSheet,Text,View,ScrollView,TouchableOpacity,LayoutAnimation} from "react-native";
//import { addAdmin,addCorporate,addInstructor } from '../../../../../Backend/Controller/AdminAdd';
import { Stack } from '@mui/material';

function AddInstructor() {

	const [errorMessage, setErrorMessage] = useState('')

	const validate = (value) => {
 
		if (validator.isStrongPassword(value, {
		  minLength: 8, minLowercase: 1,
		  minUppercase: 1, minNumbers: 1, minSymbols: 1
		})) {
		  setErrorMessage('Strong Password')
		  setError(true)
		} else {
		  setErrorMessage('Password is weak, Use 8 or more characters with a mix of letters, numbers & symbols')
		setError(true)
		}

	  }
    
	//const [gender, setGender]=useState();
	const onChange= (e) =>{
		setErrorMessage('')
		setError(false)
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
		//console.log(evt);
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
	const[error,setError]=useState(false)
	

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
            successMsg: false,
            errorMsg: "Password Mismatch",
            loading: false,
            
        });
        console.log("passwords");
    } else {
			const { FirstName,LastName,Gender,Username, Password,Email } = formData;
			const data = { FirstName,LastName,Gender,Username, Password,Email };
            console.log("dfghg")

			setFormData({ ...formData, loading: true });

            let cancel
            axios({
                method:"POST",
                url : page,
                data : data,
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
               
               const response = res.data
                
               if (response==="Sucess"){
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
                
               }
            
            }).catch(e=>{
                
                    setFormData({
                        successMsg: false,
                        errorMsg: "username taken",
                        loading: false,
                    });
                   
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
                        <h3>Instructor Registeration</h3>
                        <p style={{color:"grey"}}>Fill in the data below.</p>

		{successMsg && <p> User created successfully</p>}
        {loading && <p> Loading</p>}
        {errorMsg==="username taken" && <p style={{marginTop:0,color:'red'}}>*This Username is already taken</p>}
        {errorMsg==="All fields are required" && <p style={{marginTop:0,color:'red'}}>*All fields are required</p>}
        {errorMsg==="This email is already signed in" && <p style={{marginTop:0,color:'red'}}>*This email is already signed in</p>}
		{ errorMsg==="Password Mismatch" && <p style={{marginTop:0,color:'red'}}>*Passwords Mismatch, Please try again!</p>}

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
					className='form-control'
					placeholder='Create password'
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
            {/* AddInstructor Button */}
            <div className='form-group'>
				<button style={{marginTop:"11%"}}type='submit' className='btn btn-primary btn-block' onClick={handleInst}>
					Add 
				</button>
			</div>
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

export default AddInstructor;