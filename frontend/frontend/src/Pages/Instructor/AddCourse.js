import React, { useState, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import isEmail from 'validator/lib/isEmail';
//import { showErrorMsg, showSuccessMsg } from '../helpers/alert';
//import { showLoading } from '../helpers/loading';
//import { isAuthenticated } from '../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';
//import { addAdmin,addCorporate,addInstructor } from '../../../../../Backend/Controller/AdminAdd';


function AddCourse() {
    

	const [formData, setFormData] = useState({
        Title: '' ,
        Subtitle:'' ,
        Subject:'' ,
        Price:'' ,
        Summary:'', 
		successMsg: false,
		errorMsg: false,
		loading: false,
	});
    const [page,setPage] =useState("/")
	const {
        Title ,
        Subtitle ,
        Subject , 
        Price , 
        Summary, 
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
	

		// client-side validation
		if (
            isEmpty(Title) ||
			isEmpty(Subtitle) ||
			isEmpty(Subject) ||
			isEmpty(Price) ||
			isEmpty(Summary)
		) {
			setFormData({
				...formData,
				errorMsg: 'All fields are required',
			});
		} else {
			const { Title , Subtitle ,Subject , Price , Summary  } = formData;
			const data = { Title , Subtitle ,Subject , Price , Summary  };

			setFormData({ ...formData, loading: true });

            let cancel
            axios({
                method:"POST",
                url : "/addcourse/",
                data : data,
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
               
               const response = res.data
                console.log(response,"hhhhhhhh")
               if (response==="Sucess"){
                 setFormData({
                    Title: '' ,
                    Subtitle:'' ,
                    Subject:'' ,
                    Price:'' ,
                    Summary:'', 
		            successMsg: true,
		            errorMsg: false,
		            loading: false,
                });
               }
            
            }).catch(e=>{
                {
                    setFormData({
                        successMsg: false,
                        errorMsg: "title taken",
                        loading: false,
                    });
                   }
                if(axios.isCancel(e)) return 
            
            })

            return () => cancel ()
		}}
        

    function handleCourse(){
        setPage("/addcourse/")
    }

	/****************************
	 * VIEWS
	 ***************************/
	return (
        <>
		<form className='signup-form' onSubmit={handleSubmit} >
            {/* title */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-envelope'></i>
					</span>
				</div>
				<input
					name='Title'
					value={Title || ''}
					className='form-control'
					placeholder='Title'
					type='text'
					onChange={handleChange}
				/>
			</div>
            {/* Subitle */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-envelope'></i>
					</span>
				</div>
				<input
					name='Subtitle'
					value={Subtitle || ''}
					className='form-control'
					placeholder='Subtitle'
					type='text'
					onChange={handleChange}
				/>
			</div>
			{/* subject */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-user'></i>
					</span>
				</div>
				<input
					name='Subject'
					value={Subject || ''}
					className='form-control'
					placeholder='subject'
					type='text'
					onChange={handleChange}
				/>
			</div>
			{/* price */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-envelope'></i>
					</span>
				</div>
				<input
					name='Price'
					value={Price || ''}
					className='form-control'
					placeholder='Price'
					type='number'
					onChange={handleChange}
				/>
			</div>
			{/* Summary */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-lock'></i>
					</span>
				</div>
				<input
					name='Summary'
					value={Summary || ''}
					className='form-control'
					placeholder='Short Summary'
					type='text'
					onChange={handleChange}
				/>
			</div>
			{/* AddAdmin Button */}
			<div className='form-group'>
				<button type='submit' className='btn btn-primary btn-block' onClick={handleCourse}>
					Add Course
				</button>
			</div>
			
		</form>
        {successMsg && <p> Course Added successfully</p>}
        {loading && <p> Loading</p>}
        {errorMsg==="title taken" && <p>This Course is already made</p>}
        {errorMsg==="All fields are required" && <p>All fields are required</p>}
        <p></p>
        </>
	);
    };

export default AddCourse;