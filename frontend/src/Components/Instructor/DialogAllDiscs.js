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
import { styled,IconButton,Stack, Typography} from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios'
import ToastMess from '../OneComponent/ToastMess'
import { Toast } from '../../Context/Toast';
import Grid from '@mui/material/Unstable_Grid2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Form from 'react-bootstrap/Form';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    padding:"2rem 3rem"
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

function DialogAllDiscs (){


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
const z = [1,,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]

return (
  <>
    <BootstrapDialog
    onClose={handleCloseAll}
    aria-labelledby="customized-dialog-title"
    open={false}
    PaperProps={{
      style: {
       width:"90%",
       maxWidth:"90%",
       height:"100%"
      },
    }}
    sx={{maxHeight:"100%"}}>
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAll}>
      Apply a Promotion (% from total money)
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{padding:"1rem 3rem"}}>
   
    {/* <TextField
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
      */}

{['checkbox'].map((type,i) => (
        <div key={`inline-${type}-${i}`} className="mb-3" id= {"all"}>
           
     <Form.Check value={"all"} label={"Select all"}  name="group1" type={type}
            id={"all"}/> 
            </div> ))}
            
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
{z.map(course=> (
  <Grid item xs={2} sm={4} md={4} key={course}>
    
      {['checkbox'].map((type,i) => (
        <div key={`inline-${type}-${i}`} className="mb-3" id= {course}>
           
     <Form.Check value={course} label={"Computer Architecture"}  name="group1" type={type}
            id={course}/> 
            </div> ))}

  </Grid>
))}
</Grid>


      
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
export default DialogAllDiscs
