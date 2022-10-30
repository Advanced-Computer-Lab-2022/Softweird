import React, { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
//import { showErrorMsg, showSuccessMsg } from '../helpers/alert';
//import { showLoading } from '../helpers/loading';
//import { isAuthenticated } from '../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';
//import { addAdmin,addCorporate,addInstructor } from '../../../../../Backend/Controller/AdminAdd';


function AddUsers() {
    

	const [formData, setFormData] = useState({
        FirstName: '',
		LastName: '',
		Username: '',
		Email: '',
		Password: '',
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
                console.log(response,"hhhhhhhh")
               if (response==="Sucess"){
                 setFormData({
                    FirstName: '',
                    LastName: '',
                    Username: '',
                    Email: '',
                    Password: '',
                    Gender: '',
                    successMsg: true,
                    errorMsg: false,
                    loading: false,
                });
                console.log(successMsg)
                console.log(successMsg)
               }
            
            }).catch(e=>{
                {
                    setFormData({
                        successMsg: false,
                        errorMsg: "username taken",
                        loading: false,
                    });
                   }
                if(axios.isCancel(e)) return 
            
            })

            return () => cancel ()
		}}
        

    function handleAdmin(){
        setPage("/adminAdd/admin")
        console.log("admin")
    }
    function handleInst(){
        setPage("/adminAdd/inst")
        console.log("Instructor")
    }
    function handleCorp(){
        setPage("/adminAdd/corp")
        console.log("Corprate")
    }

	/****************************
	 * VIEWS
	 ***************************/
	return (
        <>
		<form className='signup-form' onSubmit={handleSubmit} >
            {/* firstName */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-envelope'></i>
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
						<i className='fa fa-envelope'></i>
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
						<i className='fa fa-user'></i>
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
					type='text'
					onChange={handleChange}
				/>
			</div>
			{/* gender */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-user'></i>
					</span>
				</div>
				<input
					name='Gender'
					value={Gender || ''}
					className='form-control'
					placeholder='Gender'
					type='text'
					onChange={handleChange}
				/>
			</div>
			{/* AddAdmin Button */}
			<div className='form-group'>
				<button type='submit' className='btn btn-primary btn-block' onClick={handleAdmin}>
					Add Admin
				</button>
			</div>
            {/* AddInstructor Button */}
            <div className='form-group'>
				<button type='submit' className='btn btn-primary btn-block' onClick={handleInst}>
					Add Instructor
				</button>
			</div>
            {/* AddCorprate Button */}
            <div className='form-group'>
				<button type='submit' className='btn btn-primary btn-block' onClick={handleCorp}>
					Add Corprate
				</button>
			</div>
			
		</form>
        {successMsg && <p> User created successfully</p>}
        {loading && <p> Loading</p>}
        {errorMsg==="username taken" && <p>This Username is already taken</p>}
        {errorMsg==="All fields are required" && <p>All fields are required</p>}
        {errorMsg==="This email is already signed in" && <p>This email is already signed in</p>}
        
        <p></p>
        </>
	);

	/****************************
	 * RENDERER
	 ***************************/
    };

export default AddUsers;