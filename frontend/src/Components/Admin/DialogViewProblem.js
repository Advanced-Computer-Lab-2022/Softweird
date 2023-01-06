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
import { styled,IconButton, DialogContentText,Box,Typography,Stack } from '@mui/material';
import axios from 'axios'
import ToastMess from '../OneComponent/ToastMess'
import {Toast} from '../../Context/Toast'
import { useAuth } from '../auth';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

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

const DialogViewProblem = ({ report ,setReport ,setArr ,setMessage}) => {
//  console.log(children)
  const auth = useAuth()
  const [view, setView] = useState(false);
  const [reason,setReason] = useState(false)
  const [error,setError] = useState(false)
  const [Reason,setRes] =useState("")
  const {setOpenToast} = useContext(Toast)
  const [disable,setDisable] =useState(false)
  const toggle = (e) => {
    setView(!view);
  
  };



const handleChange = (e) =>{

setRes(e.target.value)
setError(false)

}
const handleClose = () => {
  setView(false)
  setReason(false)
  setRes("")
  if( (!report.adminSeen || !report.adminSeen.includes(auth.user.id)))
  {
    console.log("ff")
    let cancel 
    axios({
      method:"POST",
      url : '/Admin/OpenR',
      data : {Rid:report._id , Aid:auth.user.id },
      headers : {'Content-Type' : 'application/json'},
      cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
   
          setReport(res.data)
          console.log(res.data)
      }).catch(e=>{
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()
  }
};
// 
function handlePend () {
  if(!reason){
  setReason(true)
  }
  else {
    const singleSpaces = Reason.replace(/  +/g, " ");
    if(singleSpaces==" " || singleSpaces==""){
        setError(true)
    }
    else{
      setReason(false);
     setDisable(true)
      let cancel 
      axios({
        method:"POST",
        url : '/Admin/pendingR',
        data : {Rid:report._id , Aid:auth.user.id ,Reason:Reason },
        headers : {'Content-Type' : 'application/json'},
        cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
          setArr(res.data)
          setMessage("Report marked pending successfully")
          setOpenToast(true)
          setRes("")
          handleClose();
          setDisable(false)
        }).catch(e=>{
          setDisable(false)
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()

    }
  }

}
function handleCloseRes(){
  setReason(false)
  setRes("")
}
function handleResolve () {
  if(window.confirm("Are you sure you want to resolve this issue")){
    let cancel 
    setDisable(true)
    axios({
      method:"POST",
      url : '/Admin/solveR',
      data : {Rid:report._id , Aid:auth.user.id },
      headers : {'Content-Type' : 'application/json'},
      cancelToken: new axios.CancelToken (c => cancel = c)
      }).then (res => {
        setArr(res.data)
        setMessage("Report marked Resolved successfully")
        setOpenToast(true)
        setRes("")
        handleClose();
        setDisable(false)
      }).catch(e=>{
        setDisable(false)
          if(axios.isCancel(e)) return 
      })
      return () => cancel ()


  }
}

return (
  <>
    <Box>
     

      <Stack direction="row">
   
  
  {!view ? 
    <>
  <Button id="view" startIcon={<ZoomInIcon/>} sx={{color:"#c50d0d"}} onClick={toggle}>
    view Problem
    </Button> </>
     : <>
      <Button id="close" startIcon={<ZoomOutIcon /> } sx={{color:"#c50d0d"}} onClick={toggle}>
    Close Problem
    </Button> 
  
     </>}
       </Stack>
    </Box>
    <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={view}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      <Stack direction="row" alignItems={"center"}>
    {reason &&<IconButton sx={{p:0,mr:"0.5rem"}} onClick={handleCloseRes}> <ChevronLeftIcon sx={{color:"#bbd2b1"}}/> </IconButton>}
     <Typography sx={{fontSize:"1.2rem"}}>Problem View</Typography> 
     </Stack>

    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
      <Typography sx={{overflowWrap:"break-word"}}>
       <i>problem: </i> {report.body}
      </Typography> 
      {reason && <TextField
      id="outlined-required"
      required = {!error}
      error = {error}
      label="Reason"
      placeholder="Reason"
      sx={{width:"70%",textAlign:"center",fontStyle:"italic",mt:"2rem"}}
      multiline={true}
      maxRows={2}
     
      fullWidth
      margin="dense"
      autoFocus
       onChange={handleChange}
     />}
    </DialogContent>
    <DialogActions>
   {report.solved=="noStatus" &&  <Button autoFocus  sx={{color:"#c50d0d"}} disabled={disable} onClick={handlePend}>
        Mark Pending
      </Button>}
     {!reason && report.solved!="resolved"&& <Button autoFocus sx={{color:"#c50d0d"}} disabled={disable} onClick={handleResolve} > 
         Resolve
      </Button>}
    </DialogActions>
  </BootstrapDialog>
  </>
)
}
export default DialogViewProblem
