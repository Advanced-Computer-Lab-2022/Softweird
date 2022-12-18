import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import { useParams } from 'react-router-dom';
import TitleIcon from '@mui/icons-material/Title';
import SubjectIcon from '@mui/icons-material/Subject';
import ListIcon from '@mui/icons-material/List';
import { useAuth } from '../../Components/auth';
//import { showErrorMsg, showSuccessMsg } from '../helpers/alert';
//import { showLoading } from '../helpers/loading';
//import { isAuthenticated } from '../helpers/auth';
//import './AddCourse.css'
//import { addAdmin,addCorporate,addInstructor } from '../../../../../Backend/Controller/AdminAdd';


function AddCourse() {

	const {inst} = useParams()
	const auth = useAuth()
	const onChange= (e) =>{
		const {name, value, type, checked }=e.target;
		setDisabled(true)
		setFormData((state) => ({
			...state,
			[name]:type === "checkbox" ? checked :value
		}));
	}
	const [disabled,setDisabled] =useState(true)

	//const [page,setPage] =useState("/")

	const priceEn= (e)=>{
		setDisabled(false)
	}

	const [formData, setFormData] = useState({
        Title: '' ,
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
			isEmpty(Subject) ||
			isEmpty(Price) ||
			isEmpty(Summary)
		) {
			setFormData({
				...formData,
				errorMsg: 'All fields are required',
			});
		} else {
			const { Title ,Subject , Price , Summary  } = formData;
			const data = { Title ,Subject , Price , Summary  };

			setFormData({ ...formData, loading: true });

            let cancel
            axios({
                method:"POST",
                url : `/Instructor/addOneCourse/${auth.user.id}`,
                data : data,
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
               
               const response = res.data
                console.log(response,"hhhhhhhh")
               if (response==="Sucess"){
                 setFormData({
                    Title: '' ,
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
					console.log(e)
                   }
                if(axios.isCancel(e)) return 
            
            })

            return () => cancel ()
		}}
        

    function handleCourse(){
        setPage("/addcourse/:id")
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
                        <h3>Add a New Course</h3>
                        <p>Fill in the data below.</p>

		{successMsg && <p> Course Added successfully</p>}
        {loading && <p> Loading</p>}
        {errorMsg==="title taken" && <p>This Course is already made</p>}
        {errorMsg==="All fields are required" && <p>All fields are required</p>}

            {/* title */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span    style={{padding: "0.5rem 0.5rem"}} className='input-group-text'>
						<TitleIcon/>
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
			{/* subject */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span  style={{padding: "0.5rem 0.5rem"}} className='input-group-text'>
						<ListIcon/>
					</span>
					
			</div>
				<input
					name='Subject'
					value={Subject || ''}
					className='form-control'
					placeholder='Subject'
					type='text'
					onChange={handleChange}
				/>
			</div>
			
			{/* price */}
			<div className='form-group input-group'>
				<div style={{display:"flex" , alignItems:"center",margin:"1rem 0"}}>
				<span  style={{padding: "0.5rem 0.5rem"}} className='input-group-text'>
				<i class="fa fa-money" aria-hidden="true"></i>
					</span>
				   <h6 style={{marginRight:"1rem", marginLeft: '1rem'}}> Price: </h6>
			<div style={{display:"block" }}>
			<div style= {{display:"flex" }}>
			<input
           name='Price'  type="radio"value="Free" onChange={onChange}/>   Free
		   </div>
		  <div style= {{display:"flex" , alignItems:"center"}}>
		  <input
          name='Price'  type="radio" value="Price" onChange={priceEn}/>   Enter Price
				<input
					name='Price'
					value={Price || ''}
					className='form-control'
					placeholder='Price'
					type='number'
					onChange={handleChange}
					disabled={disabled}
					style={{marginLeft:"1rem"}}
					/>
			</div>
			</div>
			</div>
			</div>
			{/* Summary */}
			<div className='form-group input-group'>
			<div className='input-group-prepend'>
					<span  style={{padding: "0.5rem 0.5rem"}} className='input-group-text'>
					<SubjectIcon/>
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
			<p></p>
			{/* AddAdmin Button */}
			<div className='form-group'>
				<button type='submit' className='btn btn-primary btn-block' onClick={handleCourse}>
					Add Course
				</button>
			</div>
			</div>
        </div>
		</div></form>
        <p></p>
        </>
		)};

export default AddCourse;