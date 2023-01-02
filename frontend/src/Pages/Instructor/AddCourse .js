import React, { useState,useContext } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios"
import { useParams } from 'react-router-dom';
import TitleIcon from '@mui/icons-material/Title';
import SubjectIcon from '@mui/icons-material/Subject';
import ListIcon from '@mui/icons-material/List';
import { useAuth } from '../../Components/auth';
import ToastMess from '../../Components/OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';
import Select from 'react-select';
import EuroIcon from '@mui/icons-material/Euro';
import { useNavigate, useLocation,Navigate } from 'react-router-dom';

function AddCourse() {
	const navigate= useNavigate()
	const {openToast,setOpenToast} = useContext(Toast)
	const {inst} = useParams()
	const auth = useAuth()
	const [Loading,setLoading] =useState(true)
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
		if(window.confirm("Are you sure you want to add this Course"))
		{
        evt.preventDefault();
		console.log(Subject)

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
		
		} 

		else if (Price<0 || Price>2000){
			setFormData({
				...formData,
				errorMsg: 'Price',
			});

		}
		else {
			const { Title ,Subject , Price , Summary  } = formData;
			const data = { Title ,Subject , Price , Summary  };

			setFormData({ ...formData, loading: false });

            let cancel
            axios({
                method:"POST",
                url : `/Instructor/addOneCourse/${auth.user.id}`,
                data : data,
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
             
               const response = res.data
               
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
				navigate(`/MyCourse/${Title}`)
               }
            
            }).catch(e=>{
                {
                    setFormData({
						Title: Title ,
                    Subject:Subject ,
                    Price:Price ,
                    Summary:Summary, 
                        successMsg: false,
                        errorMsg: "title taken",
                        loading: false,
                    });
					console.log(e)
                   }
                if(axios.isCancel(e)) return 
            
            })

            return () => cancel ()
		}}}
        

    function handleCourse(){
        setPage("/addcourse/:id")
    }

	const [values, setValue] = useState("Select Company")
	const Subjects = [{ value: 'Data Science', label: 'Data Science' },
	{ value: 'Computer Science', label: 'Computer Science' },
	{ value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
	{ value: 'Mathematics', label: 'Mathematics' },
	{ value: 'Sciences', label: 'Sciences' },
	{ value: 'Cloud Computing', label: 'Cloud Computing' },{ value: "Cyber Security", label:"Cyber Security" },
	{ value: "Business", label:"Business" }];

	const changeHandler = value => {
        setValue(value.value)
		
		setFormData({
			...formData,
			Subject: value.value,
			successMsg: '',
			errorMsg: '',
		});
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
						<p style={{color:"grey",paddingTop:"0.5rem"}}>Fill in the data below.</p>
		
        
        {errorMsg==="title taken" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*This Course title is already taken</p>}
        {errorMsg==="All fields are required" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*All fields are required</p>}
		{errorMsg==="Price" && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.9rem",margin:0}}>*Price is should be between 0 and 2000 </p>}

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
			<div className='form-group input-group' style={{paddingTop:"2rem"}}>
			<div className='input-group-prepend'>
					<span  style={{padding: "0.5rem 0.5rem"}} className='input-group-text'>
						<ListIcon/>
					</span>
					
			</div>
			
			<Select  style={{width:"2rem"}} 
			options={Subjects} value={Subject} onChange={changeHandler} placeholder={values}  />
			</div>
			
			{/* price */}
			<div className='form-group input-group'>
				<div style={{display:"flex" , alignItems:"center",margin:"2rem 0"}}>
				{/* <span  style={{padding: "0.5rem 0.5rem"}} className='input-group-text'>
				<i class="fa fa-money" aria-hidden="true"></i>
					</span> */}
				   <h6 style={{marginRight:"1rem", marginLeft: '1rem'}}> Price: </h6>
			<div style={{display:"block" }}>
			<div style= {{display:"flex" ,gap: "0.5rem"}}>
			<input
           name='Price'  type="radio"value="Free" onChange={onChange}/>   Free
		   </div>
		  <div style= {{display:"flex" , alignItems:"center"}}>
		  <div style= {{display:"flex" ,gap: "0.5rem",width:"100%"}}>
		  <EuroIcon sx={{position: "absolute",
    right: "96px"}}/>
		  <input
          name='Price'  type="radio" value="Price" onChange={priceEn}/>   Enter Price
		  </div>
				<input
					name='Price'
					value={Price || ''}
					className='form-control'
					placeholder='Price'
					type='number'
					min={0}
					max={2000}
					onChange={handleChange}
					disabled={disabled}
					style={{    paddingRight: "2rem",
						width: "9rem",
						marginLeft: "1rem",
					}}
					/>
			</div>
			</div>
			</div>
			</div>
			{/* Summary */}
			<div className='form-group input-group'>
			{/* <div className='input-group-prepend'>
					<span  style={{padding: "0.5rem 0.5rem"}} className='input-group-text'>
					<SubjectIcon/>
					</span>
					
			</div> */}
				<textarea
					name='Summary'
					value={Summary || ''}
					className='form-control'
					placeholder='Short Summary'
					type='text'
					aria-multiline
					
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
		{successMsg && <ToastMess message={"Course Added successfully"} /> }
        </>
		)};

export default AddCourse;