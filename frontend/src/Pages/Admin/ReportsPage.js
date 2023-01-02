import React, { useState, useEffect , useMemo } from 'react';
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

import ShowMoreText from "react-show-more-text";
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ClickAwayListener } from '@mui/material';
import OneReport from '../../Components/Admin/OneReport'
import ToastMess from '../../Components/OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';
import Switch from '@mui/material/Switch';

import Loading from '../../Components/OneComponent/Loading';



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



  const StyledTabs2 = styled((props) => (
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
      backgroundColor: '#c50d0d',
    },
  });

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


const ReportsPage = () => {
  const [loading,setLoading] =useState(true)
    const [checked, setChecked] = useState('');
    const [body, setBody] = useState('');
    const [title , setTitle] = useState('');

    const [Arr,setArr] =useState([])
    const auth = useAuth()
    const [value,setValue]=useState(1)
    const [openRep,setOpenRep]=useState(false)
    const [checked2,setChecked2] = useState(true)

const [message,setMessage] =useState("")

    const handleChange2 = (event) => {
      setChecked2(event.target.checked);
    };


    useEffect(()=>{
setLoading(true)
      let cancel
      axios({
     method:"GET",
     url : "Admin/getreports",
      cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
     setArr(res.data.r)
     setLoading(false)
   
 }).catch(e=>{
     if(axios.isCancel(e)) return 
 })
return () => cancel ()
    },[])

    



  const handleChange = (event, newValue) => {
    setValue(newValue);

  };


    
       
      
   
  return (
     <>
    
   <AppBar position="fixed" sx={{pt:"3%!important",backgroundColor:"white",boxShadow:"none",mb:"2rem",pb:"1rem",top:{xl:"5.8rem",
      lg:"6.9rem",md:"5.8rem",sm:"5.8rem",xs:"4rem"},
      boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"}}>
      <Stack direction="row" justifyContent={"center"}>
 
        <StyledTabs centered value={value} onChange={handleChange} aria-label="basic tabs example">

          <StyledTab label="All Reports" {...a11yProps(0)} />
          <StyledTab label="Unmanaged Reports" {...a11yProps(1)} />
          <StyledTab label="Pending Reports" {...a11yProps(2)} />
          <StyledTab label="Resolved Reports" {...a11yProps(3)} />
        </StyledTabs>
     

        <Stack direction="row" spacing={1} alignItems="center">
        
        <GreenSwitch

 checked={checked2}
 onChange={handleChange2}
 inputProps={{ 'aria-label': 'controlled' }}
/>
<Typography sx={{color:"grey",fontSize:"0.8rem"}}>Reports handled by me</Typography>
</Stack>
                 
        </Stack>
        </AppBar>

        {!loading && Arr&&
       <>
       <TabPanel value={value} index={0} sx={{backgroundColor:"white"}} >
       <Stack gap={4} sx={{mt:"4rem"}}>
         {Arr.map(r=>{
           return  <OneReport rep={r} checked2={checked2} setMessage={setMessage} setArr={setArr}/>
          
          
         })}
          <OneReport />
          </Stack>
          </TabPanel>
          <TabPanel value={value} index={2} sx={{backgroundColor:"white"}} >
       <Stack gap={4} sx={{mt:"4rem"}}>
         {Arr.map(r=>{
           return  r.solved=="pending" &&
           <OneReport rep={r} checked2={checked2} setMessage={setMessage} setArr={setArr}/>
          
          
         })}
          <OneReport/>
          </Stack>
          </TabPanel>

          <TabPanel value={value} index={3} sx={{backgroundColor:"white"}}>
          <Stack gap={4} sx={{mt:"4rem"}}>
          {Arr.map(r=>{
          return  r.solved=="resolved" &&
          <OneReport rep={r} checked2={checked2} setMessage={setMessage} setArr={setArr}/>
         })}

<OneReport />
         </Stack>
          </TabPanel>

          <TabPanel value={value} index={1} sx={{backgroundColor:"white"}}>
          <Stack gap={4} sx={{mt:"4rem"}}>
          {Arr.map(r=>{
           return  r.solved=="noStatus" &&
           <OneReport rep={r} checked2={checked2} setMessage={setMessage} setArr={setArr}/>
         })}
          <OneReport />
         </Stack>
         </TabPanel>
      
         </>}

        
        {loading && <Loading />}
        <ToastMess message={message} />
    </>
  )
}


export default ReportsPage;