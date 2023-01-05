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

function DialogPublish (){


const {openPublish,setOpenPublish,setReload,setCourse,setMessage,message,courses} = useContext(InstructorOneCourse)
console.log(courses)
const title = courses.title

const {openToast,setOpenToast}=useContext(Toast)

var pub = courses.subtitles.some(s=>((s.video && s.video.length==0) || !s.video
 || (s.exercise && s.exercise.length==0) || !s.exercise))
console.log(pub)
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
    setMessage("Course is published successfully")
    setOpenToast(true)
      setCourse(res.data)
  }).catch(e=>{
      if(axios.isCancel(e)) return 
  })
  return () => cancel ()
  
}




return (
  <>
    <BootstrapDialog
    onClose={()=>{setOpenPublish(false)}}
    aria-labelledby="customized-dialog-title"
    open={openPublish}
  >

    {!pub ? <><BootstrapDialogTitle id="customized-dialog-title" onClose={()=>{setOpenPublish(false)}}>
      Publish Course
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <DialogContentText>
            This is to inform you that by publishing this course, you willn't
            be able to edit it till 6 months later. You can contact company for any inquires
   </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handlePublish} sx={{color:"#c50d0d"}}>
        Agree & Publish
      </Button>
      <Button autoFocus onClick={handleClose} sx={{color:"#c50d0d"}}>
        Close
      </Button>
    </DialogActions>
    </>:
    <>
    <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>{setOpenPublish(false)}}>
      Publish Course
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <DialogContentText>
            Sorry, You can't publish your course without having atleast one video and exam per subtitle
   </DialogContentText>
    </DialogContent>
    <DialogActions>
      
      <Button autoFocus onClick={handleClose} sx={{color:"#c50d0d"}}>
        Ok
      </Button>
    </DialogActions>
    </>
    }
  </BootstrapDialog>
  <ToastMess message={message} />
  </>
)
}
export default DialogPublish
