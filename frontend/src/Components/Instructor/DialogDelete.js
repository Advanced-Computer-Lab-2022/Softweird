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

function DialogDelete (){


const {openDelete,setOpenDelete} = useContext(InstructorOneCourse)

const handleClose = () => {
 
};


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
        Are You sure you want to delete this course from system
    </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose} sx={{color:"#EC6A37"}}>
        Sure
      </Button>
      <Button autoFocus onClick={handleClose} sx={{color:"#EC6A37"}}>
        Cancel
      </Button>
    </DialogActions>
  </BootstrapDialog>
)
}
export default DialogDelete
