import React, {useContext,useEffect,useState} from "react"
import axios from 'axios'
import './Filter.css'
import {FilterSearch} from '../Context/FilterSearch'
import { Box, fontWeight } from "@mui/system"
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import {Stack} from "@mui/system"
import { AppBar, Slider } from "@mui/material"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { styled } from "@mui/material/styles"
import { createTheme , ThemeProvider} from "@mui/material/styles"
import VerticalNav from "./VerticalNav"
import StarIcon from "@mui/icons-material/Star"
import FilterListIcon from '@mui/icons-material/FilterList';
import MoneyIcon from '@mui/icons-material/Money';
import { Currency } from "../Context/Currency"
import {useAuth} from '../Components/auth'

import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

const SliderStyled = styled(Slider)({
    MuiSlider: {
        markLabel: {
         
          '&[data-index="1"]': {
            transform: "translate(50%,20%) rotate(135deg)"
          },
        },
      },
      
    
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 11,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#bbd2b1',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
          transform: 'rotate(45deg)',
        },
    },
})
  
function Filter (props) {
    const topsm = props.shift==true?"-2rem" : "-3rem"
    const topmd = props.shift==true?"1rem" : "-3rem"
    const toplg = props.shift==true?"2rem" : "-4rem"
    const topxl = props.shift==true?"-1rem" : "-5rem"
    const auth = useAuth()
    const [subjects , setSubjects]=useState([])
    const [prices , setprices]=useState([])
    const[loading,setLoading]=useState(true)
    
    const [state, setState] = useState({
        gilad: true,
        jason: false,
        antoine: false,
      });
     
    const {subject , setSubject ,price , setPrice ,rate , setRate} = useContext(FilterSearch)
    useEffect(() =>{
        setRate([0,1,2,3,4,5])
        setPrice(["Free",0,2000])
         let cancel
         axios({
             method:"GET",
             url : "/Search/filter",
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
             setSubjects(res.data[0])
         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()

     }, [])
     
     function handleSubject (e){
         const subjectEvent = e.target.id
         if(e.target.checked===true){
            
             setSubject (prevFilter => [... new Set ([...prevFilter , e.target.id])])
             
         }
         else {
             setSubject (subject.filter(item => item !== e.target.id))
        }
    }
        function handleRatings (e) {
            if(e.target.checked===true){
                if(rate.length ==6) setRate([])

                setRate (prevFilter => [... new Set ([...prevFilter , Number(e.target.id)])])
                
                
            }
            else {
                var arr = rate.filter(item => item !== Number(e.target.id))
                if( arr.length ===0 )
                   arr = [0,1,2,3,4,5]
                setRate(arr)
           }
       }

       const minDistance = 10;
       const handleChange1 = (
        event,
        newValue,
        activeThumb,
      ) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (activeThumb === 0) {
          setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
          if(checked){
              setPrice(["Free",Math.min(newValue[0], value1[1] - minDistance), value1[1]])
          }
          else{
            setPrice([null,Math.min(newValue[0], value1[1] - minDistance), value1[1]])
          }
        } else {
          setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
          if(checked){
            setPrice(["Free",value1[0], Math.max(newValue[1], value1[0] + minDistance)])
        }
        else{
          setPrice([null,value1[0], Math.max(newValue[1], value1[0] + minDistance)])
        }
        }
      };
      const [value1, setValue1] = useState([0, 2000]);


      const [checked, setChecked] = React.useState(false);

      const handleChange = (event) => {
        setChecked(event.target.checked);
        if(event.target.checked==false){
            if(checked2){
                setPrice([null,value1[0],value1[1]])
            }
            else{
                setPrice(["Free",0,2000])
            }
           
      
            
        }
        else{

            if(checked2){
                setPrice(["Free",value1[0],value1[1]])
            }
            else{
                setPrice(["Free",-1,-1])
            }
        }
      };

      const [checked2, setChecked2] = React.useState(false);

      const handleChange2 = (event) => {
        setChecked2(event.target.checked);
        if(event.target.checked==false)
        { 
            setValue1([0,2000])
            if(checked){
                setPrice(["Free",-1,-1])
            }
            else setPrice(["Free",0,2000])
        }
        else{
            if(checked){
                setPrice(["Free",value1[0],value1[1]])
            }
            else setPrice([null,value1[0],value1[1]])
        }

        }
      

     console.log(price)

    return(
        <>
            
   <AppBar className="navbar navbar-expand-lg navbar-light bg-light" sx={{width:"30%" , left:{md:"-1.5rem",lg:"-3.5rem",xl:"-11.5rem"} , 
        top:{sm:topsm,md:topmd,lg:toplg,xl:topxl},marginBottom:"-15rem", paddingBottom:"3rem",position:"relative",zIndex:"initial",boxShadow:"none",color:"#000",display:{xs:"none",sm:"none",md:"block",lg:"block",xl:"block"}}}>

        <Stack  sx={{alignSelf:"flex-start",mt:"3rem",ml:"2rem",display:{sm:"none",md:"flex",xs:"none"}}} flex={1} gap={4} paddingLeft={"1rem"}>
        
        <Stack direction={"row"} gap={2}>
        <FilterListIcon fontSize="medium" sx={{ color: "#bbd2b1"}}/>
        <Typography component="legend" sx={{color:"black",
      fontWeight:"bold",fontSize:"1.2rem"}}>Filter By :</Typography>
        </Stack>
        <Stack flex ={1} direction="column" maxHeight={200} height={"100%"} >
            <Stack direction="row" alignItems={"baseline"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book-half" viewBox="0 0 16 16" >
        <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg>
      <FormLabel component="legend" sx={{maxWidth:"5rem",color:"black",textAlign:"center",
      fontWeight:"bold",fontSize:"1rem"}}>Subjects:</FormLabel></Stack>
          <List className="filters" direction="row" sx={{
        width: "100%",
        maxWidth: "90%",
        position: 'relative',
        overflow: 'auto',
        height:"100%",
        maxHeight:150,
        padding:"1rem"
        }}>
            {subjects.map (subject=>{
    return   <div class="form-check" key = {subject}>
            <input className="form-check-input" type="checkbox" value="" id={subject} onChange={handleSubject} />
            <label className="form-check-label" htmlFor="flexCheckChecked">
        {subject}
</label>
</div>
    })}
        
      
        </List>
        </Stack>
        <Stack flex ={1} direction="column" maxHeight={200} height={"100%"} sx={{position:"relative" }}>
        {props.show && <>
        <FormLabel component="legend" sx={{maxWidth:"5rem",color:"black",textAlign:"center",
     fontWeight:"bold"}}>
     <StarIcon style={{ opacity: 0.55,color:"#faaf00" }} fontSize="inherit" />   Ratings:</FormLabel>
          <List direction="row" sx={{
        position: 'relative',
   
       
        height:"100%",
        padding:"1rem"
        }}>
                <div className="form-check" key = {5}>
            <input className="form-check-input" type="checkbox" value="" id="5"onChange={handleRatings} />
            <label className="form-check-label" >5 
                </label>
                </div>
             
                <div className="form-check" key = {4}>
            <input className="form-check-input" type="checkbox" value="" id="4"onChange={handleRatings} />
            <label className="form-check-label" >4   - 5  
                </label>
                </div>
            
                <div className="form-check" key = {3}>
            <input className="form-check-input" type="checkbox" value="" id="3"onChange={handleRatings} />
            <label className="form-check-label" >3   - 4  
                </label>
                </div>
               
            
                <div className="form-check" key = {2}>
            <input className="form-check-input" type="checkbox" value="" id="2"onChange={handleRatings} />
            <label className="form-check-label" >2   - 3  
                </label>
                </div>
               
                <div className="form-check" key = {1}>
            <input className="form-check-input" type="checkbox" value="" id="1"onChange={handleRatings} />
            <label className="form-check-label" >1   - 2  
                </label>
                </div>
                <div className="form-check" key = {0}>
            <input className="form-check-input" type="checkbox" value="" id="0"onChange={handleRatings} />
            <label className="form-check-label" >0   - 1  
                </label>
                </div>
        </List></>}
        </Stack>

 {  ( !auth.user || (auth.user && auth.user.type!="corporate") )&&
       <Stack gap={3}>
        <Stack direction="row" alignItems={"flex=start"}> 
        <MoneyIcon sx={{fontSize:"1.4rem"}}/>
        <FormLabel component="legend" sx={{maxWidth:"3rem",color:"black",textAlign:"center",
     fontWeight:"bold"}}>Price:</FormLabel></Stack>

  <div className="form-check" key = {"Free"}>
  <input className="form-check-input" type="checkbox" value="" id="Free" onChange={handleChange} checked={checked} />
   <label className="form-check-label" >Free
     </label>
      </div>
  

<Stack gap={2}>
    <Stack direction ="row" gap={2}>
    
    <div className="form-check" key = {"Free"}>
  <input className="form-check-input" type="checkbox" value="" id="Values" onChange={handleChange2} checked={checked2} />
      </div>
        <SliderStyled
        
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
      disabled={!checked2}
        step={20}
        min={0}
        max={2000}
        disableSwap
        
        sx={{color:"#c50d0d",width: "80%"}}
      />
        </Stack>
        <Stack direction ="row" gap={5} justifyContent={"center"}>
          <Stack direction="row" alignItems={"center"} gap={2}>
              <Typography sx={{fontWeight:"bold"}}>Min:</Typography>
          <Input
            value={value1[0]}
            size="small"
           
          />
</Stack>

<Stack direction="row" alignItems={"center"} gap={2}>
              <Typography sx={{fontWeight:"bold"}}>Max:</Typography>
          <Input
            value={value1[1]}
            size="small"
           
          />
</Stack>


          

       </Stack>
</Stack>
</Stack>}
        </Stack>
        
<Stack>
    
    </Stack>



        </AppBar>
        <FilterListIcon fontSize="medium" sx={{ position:"absolute" , left:"17rem",top:"6px",color: "#bbd2b1",display:{md:"none",sm:"block",xs:"block"}}}/>

</>
    )

}

export default Filter


{/* <div className="checkboxes">
<label>Subjects</label>
<ul>
{subjects.map (subject=>{
    return <li key = {subject}><input id={subject} type="checkbox" onChange={handleSubject}/> {subject}</li>
})}
</ul>
</div>
<div className="checkboxes">

{props.show && <>
<label>Ratings</label>
<ul>
    <li><input id="0" type="checkbox" onChange={handleRatings}/>0 - 1</li>
    <li><input id="1" type="checkbox" onChange={handleRatings}/>1 - 2</li>
    <li><input id="2" type="checkbox" onChange={handleRatings}/>2 - 3</li>
    <li ><input id="3" type="checkbox" onChange={handleRatings}/> 3 - 4</li>
    <li><input id="4" type="checkbox" onChange={handleRatings}/>4 - 5</li>
    <li><input id="5" type="checkbox" onChange={handleRatings}/>5</li>
</ul></>}
</div> */}