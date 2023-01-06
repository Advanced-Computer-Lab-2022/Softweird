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
import { styled,IconButton, DialogContentText } from '@mui/material';
import axios from 'axios'
import ToastMess from '../OneComponent/ToastMess'
import {Toast} from '../../Context/Toast'
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

function DialogAcceptAccess ({setOpenAccp,openAccp, setAccess,access ,setMessage,setAcc}){
const auth = useAuth()
const {openToast,setOpenToast} = useContext(Toast)


const handleClose = () => {
  setOpenAccp(false)
};
const handleAccess =() => {
  let cancel
 
  setOpenAccp(false)
  axios({
    method:"POST",
    url : '/Admin/solveAccess',
    data : {repId:access._id ,Cid:access.Trainee._id, Aid:auth.user.id , status:"accepted" ,course:access.Course.course.title,reason:""},
    headers : {'Content-Type' : 'application/json'},
    cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
    setMessage("Access Granted Successfully")
    setOpenToast(true)
      setAcc(res.data)
  }).catch(e=>{
      if(axios.isCancel(e)) return 
  })
  return () => cancel ()
  
}


return (
  <>
    <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={openAccp}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Refund Acceptance
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <DialogContentText>
           By Accepting this access request , the corporate trainee will gain a full free access of course
   </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleAccess} sx={{color:"#c50d0d"}}>
        Accept
      </Button>
      <Button autoFocus onClick={handleAccess} sx={{color:"#c50d0d"}}>
        close
      </Button>
    </DialogActions>
  </BootstrapDialog>
  </>
)
}
export default DialogAcceptAccess
