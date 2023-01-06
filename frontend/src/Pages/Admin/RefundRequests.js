import React, { useState, useEffect , useMemo, useContext } from 'react';
import axios from "axios"

import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../../Components/auth'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar } from "@mui/material"
import { styled,Box,Typography,Stack } from "@mui/material"
import OneRefund from '../../Components/Admin/OneRefund'
import ToastMess from '../../Components/OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';
import Switch from '@mui/material/Switch';
import NoReports from '../../Components/OneComponent/NoReports'
import Loading from '../../Components/OneComponent/Loading'

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: '000',
    '&.Mui-selected': {
      color: '#000000',
    },
    '&:hover': {
      color: '#bbd2b1',
      opacity: 1,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);



  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
    
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: '50%',
      width: '100%',
      backgroundColor: '#bbd2b1',
    },
  });

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



  const GreenSwitch = styled(Switch)(({ theme }) => ({
      marginLeft:"2rem",
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "#c50d0d",
      
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#c50d0d"    },
     '& .MuiSwitch-root':{
        
     } 
  }));


const RefundRequests = () => {
  const [loading,setLoading] =useState(false)
    const [checked, setChecked] = useState('');
    const [body, setBody] = useState('');
    const [title , setTitle] = useState('');
const {openToast,setOpenToast} = useContext(Toast)
const [message,setMessage] =useState("")
    const [ref,setRef] =useState([])
    const auth = useAuth()
    const [value,setValue]=useState(0)
    const [openRep,setOpenRep]=useState(false)
    const [ind ,setInd] = useState([])
    const[all,setAll]=useState("")
    const [checked2, setChecked2] = React.useState(true);


    useEffect(()=>{
setLoading(true)
      let cancel
      axios({
     method:"GET",
     url : "/Admin/getRefunds",
      cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
     setRef(res.data.a)
     setInd(res.data.i)
     setLoading(false)
     
   
 }).catch(e=>{
     if(axios.isCancel(e)) return 
 })
return () => cancel ()
    },[])

   



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };

       
  
    // ))  
   
  return (
     <>
   <AppBar position="fixed" sx={{pt:"3%!important",backgroundColor:"white",boxShadow:"none",mb:"2rem",pb:"1rem",top:{xl:"5.8rem",
      lg:"6.9rem",md:"5.8rem",sm:"5.8rem",xs:"4rem"},
      boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"}}>
      <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
     
        <StyledTabs centered value={value} onChange={handleChange} aria-label="basic tabs example">

          <StyledTab label="All Refund Requests" {...a11yProps(0)} />
          <StyledTab label="Pending Refund Requests" {...a11yProps(1)} />
          <StyledTab label="Accepted Refund Requests" {...a11yProps(2)} />
          <StyledTab label="Rejected Refund Requests" {...a11yProps(3)} sx={{marginRight:"2rem"}}/>
         
        </StyledTabs>
        <Stack direction="row" spacing={1} alignItems="center">
        
           <GreenSwitch
  
    checked={checked2}
    onChange={handleChange2}
    inputProps={{ 'aria-label': 'controlled' }}
  />
  <Typography sx={{color:"grey",fontSize:"0.8rem"}}>Requests handled by me</Typography>
  </Stack>

                    </Stack>
        </AppBar>
       
{!loading && ref.length!=0 && 
      
       <>
       <TabPanel value={value} index={0} sx={{backgroundColor:"white"}} >
       <Stack gap={4} sx={{mt:"4rem"}}>
         {ref.length!=0 ? ref.map(r=>{
           return   <OneRefund refu={r} indiv={ind.find(i=>i.user==r.Trainee._id) } checked2={checked2} setMessage={setMessage} setRef={setRef}/> 
         
          
          
         }):<NoReports message={"There are no refund requests"}/>} 

          </Stack>
          </TabPanel>
          <TabPanel value={value} index={1} sx={{backgroundColor:"white"}} >
       <Stack gap={4} sx={{mt:"4rem"}}>
         {ref.some(ref=>ref.state=="pending") ?ref.map(r=>{
           return  r.state=="pending" &&
           <OneRefund refu={r} indiv={ind.find(i=>i.user==r.Trainee._id)} checked2={checked2} setMessage={setMessage} setRef={setRef}/>
          
          
         }):<NoReports message={"There are no pending refund requests"}/>}
        
          </Stack>
          </TabPanel>

          <TabPanel value={value} index={2} sx={{backgroundColor:"white"}}>
          <Stack gap={4} sx={{mt:"4rem"}}>
          {ref.some(re=>re.state=="accepted")?ref.map(r=>{
           return  r.state=="accepted" &&
           <OneRefund refu={r} indiv={ind.find(i=>i.user==r.Trainee._id)}  checked2={checked2} setMessage={setMessage} setRef={setRef}/>
          
          
         }):<NoReports message={"There are no accepted refund requests"}/>}
         </Stack>
          </TabPanel>

          <TabPanel value={value} index={3} sx={{backgroundColor:"white"}}>
          <Stack gap={4} sx={{mt:"4rem"}}>
          {ref.some(re=>re.state=="rejected") ?ref.map(r=>{
           return  r.state=="rejected" &&
           <OneRefund refu={r} indiv={ind.find(i=>i.user==r.Trainee._id)}  checked2={checked2} setMessage={setMessage} setRef={setRef}/>
          
          
         }): <NoReports message={"There are no rejected refund requests"}/>}
         
         </Stack>
         </TabPanel>
      
         </>

        }
        <ToastMess message={message}/>
    </>
  )
}


export default RefundRequests;