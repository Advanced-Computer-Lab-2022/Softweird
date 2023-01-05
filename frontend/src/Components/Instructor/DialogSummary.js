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
import { styled,IconButton } from '@mui/material';
import axios from 'axios';
import ToastMess from '../OneComponent/ToastMess';
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

function DialogSubtitle (){

const {setOpenToast} = useContext(Toast)
const {openSumm,setOpenSumm,courses,setCourse,setReload,setMessage,message} = useContext(InstructorOneCourse)
const [summary,setSummary]=useState("")
const[success,setSucess]=useState(true)
const [empty,setEmpty] =useState(false)


const handleSubmit = () => {


  const singleSpaces = summary.replace(/  +/g, " ");
  if(singleSpaces==" " || singleSpaces==""){
    setSucess(false)
    setEmpty(true)
    
  }

  
     else if (window.confirm("Are you sure you want to edit this summary?")){
        setOpenSumm(false);
        setEmpty(false)
        setSucess(true)
       
   
        let cancel
        axios({
          method:"PATCH",
          url : '/Instructor/editSummary',
          data : {summary:summary,courseTitle:courses.title},
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
            setMessage("Summary modified successfully")
            setOpenToast(true)
            setOpenSumm(false)
            setCourse(res.data)
            setReload(true)
        
        }).catch(e=>{
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
        
     }
  
};


const handleChanging = evt => {
    setSummary(evt.target.value);
  }
const handleClose= ()=>{
    setOpenSumm(false)
}
return (
  <>
     
          <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={openSumm}
 
    sx={{maxHeight:"100%"}}
  >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Edit Summary
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <TextField
      required = {success}
      error = {empty}
      label="Edit Summary"
      placeholder="Edit Summary"
      sx={{width:"90%",textAlign:"center",fontStyle:"italic"}}
      multiline={true}
      maxHeight={"2rem"}
      variant="outlined"
      id="outlined-basic"
      fullWidth
      margin="dense"
      autoFocus
      defaultValue={courses.summary}
      onChange={handleChanging}/>
    

     {empty && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* All fields are required.</p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus  sx={{color:"#c50d0d"}} onClick={handleSubmit}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>

    
      
  <ToastMess message={message} />
  </>
)
}
export default DialogSubtitle
