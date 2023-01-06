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
import { styled,IconButton,Typography } from '@mui/material';
import axios from 'axios';
import ToastMess from '../OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';
import { TraineeMyCourses } from '../../Context/TraineeMyCourses';
import WarningIcon from '@mui/icons-material/Warning';
import { useAuth } from '../auth';



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

function DialogRefundRequest ({open,setOpen,course,myCourse,setMyCourse,setMessage}){
const auth = useAuth()
const {myCourses,setMyCourses ,courses,setCourses,instructors,setInstructors,cert ,setCert,ref,setRef
    ,ongoing,setOnGoing} = useContext(TraineeMyCourses)
const {setOpenToast} = useContext(Toast)
const[success,setSucess]=useState(true)
const [error,setError] =useState(false)
const [reason,setReason] =useState("")
const [submitDisable,setSubmitDisable]=useState(false) 

const [send,setSend] = useState(false)

const handleSubmit = () => {

setSend(true)
  const singleSpaces = reason.replace(/  +/g, " ");
  if(singleSpaces==" " || singleSpaces==""){
    setSucess(false)
    setError(true)
    setSend(false)
    
  }
 
     else if (window.confirm("Are you sure you want to request a refund?")){
        setOpen(false);
        setError(false)
        setSucess(true)

        
        let cancel
        setSubmitDisable(true)
        axios({
          method:"POST",
          url : `/Individual/refundRequests/${auth.user.id}`,
          data : {courseId:course._id,reason:reason},
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
            setMyCourses(res.data)      
            setMessage("Request submitted successfully")
            setOpenToast(true)
            setSend(false)
        }).catch(e=>{
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
        
     }
  }




function handleOpen(){
   setOpen(false)
   setReason("")
   setError(false)
   setSucess(true)
 
}
return (
  <>
    <BootstrapDialog
    onClose={handleOpen}
    aria-labelledby="customized-dialog-title"
    open={open}
    sx={{maxHeight:"100%"}}
  >
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleOpen}>
      Refund Request
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <Typography fontWeight={"bold"} lineHeight={1.5} >
      <WarningIcon sx={{color:"#c50d0d",fontSize:"1.1rem",mr:"1%"}}/> Note: By requesting a refund to this course , your access will be suspended. If your request is
        acceppted you will only receive an a fraction of your money depending on your progress
    </Typography>
    <TextField
      required = {success}
      error = {error}
      label="Reason For Refund"
      placeholder="Title of Subtitle"
      sx={{width:"80%",textAlign:"center",fontStyle:"italic",marginTop:"2rem"}}
      multiline={true}
      maxRows={4}
      id="outlined-required"
      fullWidth
      margin="dense"
      autoFocus
      onChange={(e)=>{setReason(e.target.value)
                        setError(false)
                        setSucess(true)}}/>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSubmit} sx={{color:"#c50d0d"}} disabled={submitDisable}>
      {send ? <div className="spinner" id="spinner"></div> : "Send"}
      </Button>
    </DialogActions>
  </BootstrapDialog>
  
  </>
)
}
export default DialogRefundRequest
