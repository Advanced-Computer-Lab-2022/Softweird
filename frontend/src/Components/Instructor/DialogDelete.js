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
import { useNavigate } from 'react-router-dom';

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

function DialogDelete (){

const navigate = useNavigate()
const {openDelete,setOpenDelete,courses} = useContext(InstructorOneCourse)

const handleClose = () => {
  setOpenDelete(false)
 
};
const handleDelete= () => {
  let cancel
  axios({
    method:"PATCH",
    url : '/Instructor/deleteCourse',
    data : {courseTitle:courses.title},
    headers : {'Content-Type' : 'application/json'},
    cancelToken: new axios.CancelToken (c => cancel = c)
  }).then (res => {
    navigate('/MyCourses',{state: {message:"course deleted",course:courses.title}})

  }).catch(e=>{
      if(axios.isCancel(e)) return 
  })
  return () => cancel ()
  
}



return (
    <BootstrapDialog
    onClose={()=>{setOpenDelete(false)}}
    aria-labelledby="customized-dialog-title"
    open={openDelete}
  >
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>{setOpenDelete(false)
                                                                     }}>
     Delete Course
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <DialogContentText>
        Are You sure you want to remove this course from system
    </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleDelete} sx={{color:"#c50d0d"}}>
        Sure
      </Button>
      <Button autoFocus onClick={handleClose} sx={{color:"#c50d0d"}}>
        Cancel
      </Button>
    </DialogActions>
  </BootstrapDialog>
)
}
export default DialogDelete
