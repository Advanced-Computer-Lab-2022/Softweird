import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { InstructorOneCourse } from '../../Context/InstructorOneCourse';
import {  useContext ,useState} from 'react';
import { styled,IconButton,Stack} from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios'
import ToastMess from '../OneComponent/ToastMess'
import { Toast } from '../../Context/Toast';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));




function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"#c50d0d"
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DialogDisc (){


const {openDisc,setOpenDisc,setCourse,courses,message ,setMessage} = useContext(InstructorOneCourse)
const [promotion,setPromotion]=useState("")
const [date,setDate] =useState("")
const[success,setSucess]=useState(true)
const [error,setError] =useState(false)
const[datesuccess,setDateSucess]=useState(true)
const [dateerror,setDateError] =useState(false)
const [numberError , setNumberError] = useState(false)
const [numberMax , setNumberMax] = useState(false)
const {setOpenToast} = useContext(Toast)
const [over75,setOver75] =useState(false)

const handleClose = () => {
  const singleSpaces = promotion.replace(/  +/g, " ");
  if(date==""){
    setDateError(true)
    setDateSucess(false)
    
  }
  if(singleSpaces==" " || singleSpaces==""){
    setSucess(false)
    setError(true)
  }
  else if (isNaN(promotion)){
    setSucess(false)
    setError(true)
    setNumberError(true)

  }
  else if (promotion > 100 ){
    setSucess(false)
    setError(true)
    setNumberMax(true)

  }
  else if (promotion > 75 ){
    setSucess(false)
    setError(true)
    setOver75(true)

  }
  else if (window.confirm("Are you sure you want to set promotion?")){
    setDateError(false)
    setDateSucess(true)
        setOpenDisc(false);
        setError(false)
        setSucess(true)
        setSucess(true)
        setOver75(false)
    setError(false)
    setNumberMax(false)
    setNumberError(false)
        let cancel
        axios({
          method:"PATCH",
          url : '/Instructor/promoteCourse',
          data : {courseTitle:courses.title,promotion:promotion,date:date},
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
            setCourse(res.data)
            setMessage("Promotion is set Successfully")
            setOpenToast(true)
            
        }).catch(e=>{
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
        
     }
  }
 


     
function handleCloseAll () {
  setDateError(false)
  setDateSucess(true)
    setError(false)
    setSucess(true)
    setPromotion("")
    setNumberError(false)
    setNumberMax(false)
    setOpenDisc(false)
    setOver75(false)
}
function changeProm (e){
    setPromotion(e.target.value)
    setError(false)
    setSucess(true)
    setNumberError(false)
    setNumberMax(false)
    setOver75(false)
    
}
function changeDate(e){
  setDate(e.target.value)
  setDateError(false)
  setDateSucess(true)
  setOver75(false)
   
}


return (
  <>
    <BootstrapDialog
    onClose={handleCloseAll}
    aria-labelledby="customized-dialog-title"
    open={openDisc}
    sx={{maxHeight:"100%"}}>
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAll}>
      Apply a Promotion (% from total money)
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
   
    <TextField
      required = {success}
      error = {error}
      label="Promotion of course"
      placeholder="Promotion of course (max 75%)"
      sx={{width:"70%",textAlign:"center",fontStyle:"italic"}}
      InputProps={{ endAdornment:<InputAdornment position="end">%</InputAdornment>}}
      multiline={true}
      maxRows={2}
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={changeProm}/>
       {numberError && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>*Should be a number</p>}
       {numberMax && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>*Maximum promotion is 100%</p>}
       {over75 && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>*Maximum promotion you can add is 75%</p>}
      <TextField
      required = {datesuccess}
      error = {dateerror}
        id="date"
        label="Expiry Date *"
        type="date"
        variant="standard"
        fullWidth
        margin="dense"
        autoFocus
        
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{min:new Date().toISOString().slice(0,10)}}
        onChange ={changeDate}
        sx={{width:"70%",textAlign:"center",fontStyle:"italic",mt:"5%",mb:"4%"}}
      />
     

      
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose} sx={{color:"#c50d0d"}}>
        Add
      </Button>
    </DialogActions>
  </BootstrapDialog>
  <ToastMess message={message}/>
  </>
)
};
export default DialogDisc
