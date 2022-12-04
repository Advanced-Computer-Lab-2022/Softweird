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
            color:"#EC6A37"
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

function DialogPublish ({course}){

const title = course.title
const {openPublish,setOpenPublish,setReload,setCourse} = useContext(InstructorOneCourse)

const handleClose = () => {
  setOpenPublish(false)
};
const handlePublish =() => {
  let cancel
  setReload(true)
  setOpenPublish(false)
  axios({
    method:"PATCH",
    url : '/Instructor/publishCourse',
    data : {courseTitle:title},
    headers : {'Content-Type' : 'application/json'},
    cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
      setCourse(res.data)
  }).catch(e=>{
      if(axios.isCancel(e)) return 
  })
  return () => cancel ()
  
}


return (
    <BootstrapDialog
    onClose={()=>{setOpenPublish(false)}}
    aria-labelledby="customized-dialog-title"
    open={openPublish}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>{setOpenPublish(false)}}>
      Publish Course
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <DialogContentText>
            This is to inform you that by publishing this course, you willn't
            be able to edit it till 6 months later. You can contact company for any inquires
   </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handlePublish} sx={{color:"#EC6A37"}}>
        Agree & Publish
      </Button>
      <Button autoFocus onClick={handleClose} sx={{color:"#EC6A37"}}>
        Close
      </Button>
    </DialogActions>
  </BootstrapDialog>
)
}
export default DialogPublish
