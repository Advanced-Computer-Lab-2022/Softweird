import React, { useState,useContext } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
import Select from 'react-select';
import validator from 'validator';

import './AddUser.css';

import {Toast} from '../../Context/Toast'
import ToastMess from '../../Components/OneComponent/ToastMess'

function AddCorporate() {
	//let Com="mm";
	const [errorMessage, setErrorMessage] = useState('')
	const{setOpenToast}=useContext(Toast)
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
		Com:'',
        FirstName: '',
		LastName: '',
		Username: '',
		Email: '',
		Password: '',
        ConfrimPassword:'',
		Gender: '',
		Level: '',
		successMsg: false,
		errorMsg: false,
		loading: false,
	});
    const [page,setPage] =useState("/")
	var {
		Com,
        FirstName,
		LastName,
		Username,
		Email,
		Level,
		Password,
        ConfrimPassword,
		Gender,
		successMsg,
		errorMsg,
		loading,
	} = formData;

	const [values, setValue] = useState("Select Company")
	const companies = [{ value: 'Select Company', label: 'Select Company' },
	{ value: 'GUC', label: 'GUC' },
	{ value: 'AUC', label: 'AUC' },
	{ value: 'GIU', label: 'GIU' },{ value: 'CIB', label: 'CIB' },
	{ value: 'ADIB', label: 'ADIB' },
	{ value: 'Facebook', label: 'Facebook' },{ value: 'Google', label: 'Google' }];

	const changeHandler = value => {
		console.log(value)
        setValue(value.value)
		
		setFormData({
			...formData,
			Com: value.value,
			successMsg: '',
			errorMsg: '',
		});
	}


	const [values2, setValue2] = useState("Select Level")
	const levels = [{ value: 'Select Level', label: 'Select Level' },
	{ value:1, label: 1 },
	{ value: 2, label: 2 },
	{ value: 3, label: 3 },{ value: 4, label: 4 },
	{ value: 5, label: 5 },
	];

	const changeHandler2 = value => {
		console.log(value)
        setValue2(value.value)
		
		setFormData({
			...formData,
			Level: value.value,
			successMsg: '',
			errorMsg: '',
		});
	}


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
		if(window.confirm("Are you sure you want to add this Corporate"))
{        evt.preventDefault();
        console.log("form")
        console.log(FirstName)
        console.log(Username)
	

		// client-side validation
		if (isEmpty(Com)||
			isEmpty(FirstName) ||
			isEmpty(LastName) ||
			isEmpty(Username) ||
			isEmpty(Email) ||
			isEmpty(Password) ||
			isEmpty(ConfrimPassword)||
			isEmpty(Gender)||Level=="Select Level"||Com=="Select Company"
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
		}  else if(Password!== ConfrimPassword){
        setFormData({
            successMsg: false,
            errorMsg: "Password Mismatch",
            loading: false,
            
        });
        console.log("passwords");
    }else {
			const {Com,FirstName,LastName,Gender,Username, Password,Email,Level } = formData;
			const data = {Com,FirstName,LastName,Gender,Username, Password,Email,Level };
            console.log(values+" hna ")


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
                console.log(response,"hhhhhhhh")
               if (response==="Sucess"){
                 setFormData({
					Level:"Select Level",
					Com:"Select Company",
					
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
				setOpenToast(true)

                
               }
			   else if(response === "This email is already signed in"){
				setpassword("password");
			seteye(true);
			settype(false);
                setFormData({
					Com:Com,
					FirstName: FirstName,
                    LastName: LastName,
                    Username: Username,
                    Email: '',
                    Password: '',
                    ConfrimPassword:'',
                    Gender: Gender,
					Level:Level,
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
					Com:Com,
					FirstName: FirstName,
                    LastName: LastName,
                    Username: "",
                    Email: Email,
                    Password: '',
                    ConfrimPassword:'',
                    Gender: Gender,
					Level:Level,
                    successMsg: false,
                    errorMsg: "username taken",
                    loading: false,
                });
               }
            
            
            }).catch(e=>{
                
				setFormData({
						
					successMsg: false,
					errorMsg: e,
					loading: false,
				});
                   
                if(axios.isCancel(e)) return 
            
            })
            return () => cancel ()
		}}
	}

    function handleCorp(){
        setPage("/adminAdd/corp")
        console.log("Corprate")
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
                        <h3>Corporate Registeration</h3>
                        <p style={{color:"grey"}}>Fill in the data below.</p>

      
        {errorMsg==="username taken" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>This Username is already taken</p>}
        {errorMsg==="All fields are required" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>All fields are required</p>}
        {errorMsg==="This email is already signed in" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>This email is already signed in</p>}
		{errorMsg==="Password Mismatch" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>Passwords Mismatch, Please try again!</p>}  
			  {/* company */}
			  <div className='form-group input-group' >
			  <div className='input-group-prepend '>
					<span className='input-group-text'>
						<i className='fa fa-building'></i>
					</span>
				</div>
			<>
     <Select options={companies} value={Com} onChange={changeHandler} placeholder={values} style={{width:"2rem"}}  />
     </>
			</div>

			<div className='form-group input-group'style={{paddingTop:"1rem"}} >
			  <div className='input-group-prepend '>
					<span className='input-group-text'>
						<i className='fa fa-building'></i>
					</span>
				</div>
			<>
     <Select options={levels} value={Level} onChange={changeHandler2} placeholder={values2} style={{width:"2rem"}}  />
     </>
			</div>

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
			<div className='form-group input-group' autoComplete="off">
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-address-card'></i>
					</span>
				</div>
				<input
				autoComplete='false'
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
			<div className='form-group input-group'  autoComplete= "off">
			<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-lock'></i>
						
					</span>
				</div>
				<input
				autoComplete='false'
					name='Password'
					value={Password || ''}
					className='form-control'
					placeholder='Create password'
					autoComplete="new-password"
					type={paswo}
					onChange={handleChange}
                    onInput={(e) => validate(e.target.value)}></input> 
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                    <br />
                  
					
				
			</div>
			{errorMessage!='' && <div className='form-group input-group'>
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
        <div className='form-group' value={Gender}>
		<h6>Gender: </h6>
            <input
			name='Gender' type="radio" value="Male" onChange={onChange} />  Male    
            <input style={{margin: "8px"}}
          name='Gender'  type="radio"value="Female"onChange={onChange}/>   Female  
            <input style={{margin: "8px"}}
			name='Gender' type="radio" value="Others" onChange={onChange} /> Others 
         </div>
	   <h3> </h3>
            {/* AddCorprate Button */}
            <div className='form-group'>
				<button style={{marginTop:"11%"}} type='submit' className='btn btn-primary btn-block' onClick={handleCorp}>
					Add 
				</button>
			</div>
                    </div>
                </div>
				</div>
		
      
        </form>
        <p></p>
		{successMsg && <ToastMess message="Corporate Created successfully" />}
        </>
	);

	/****************************
	 * RENDERER
	 ***************************/
    };

export default AddCorporate;