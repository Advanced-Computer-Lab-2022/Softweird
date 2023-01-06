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
const {openAdd,setOpenAdd,courses,setCourse,setReload,setMessage,message} = useContext(InstructorOneCourse)
const [subtitle,setSubtitle]=useState("")
const[success,setSucess]=useState(true)
const [error,setError] =useState(false)
const [sameSubtitle,setSameSubtitle] = useState(false)

const titles =[]
const subtitles = courses.subtitles
if(subtitles!==undefined){subtitles.map(subtitle => {
  titles.push(subtitle.title)

})}


const handleSubmit = () => {


  const singleSpaces = subtitle.replace(/  +/g, " ");
  if(singleSpaces==" " || singleSpaces==""){
    setSucess(false)
    setError(true)
    setSameSubtitle(false)
    
  }
  else{
    if(titles.includes(subtitle)){
  
      setSameSubtitle(true)
      setError(true)
      setSucess(false)

    }
     else if (window.confirm("Are you sure you want to add this subtitle?")){
        setOpenAdd(false);
        setError(false)
        setSucess(true)
        setSameSubtitle(false)
        setReload(true)
        let cancel
        axios({
          method:"PATCH",
          url : '/Instructor/addSubtitles',
          data : {subtitleTitle:subtitle,courseTitle:courses.title},
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
            setCourse(res.data)
            setMessage("Subtitle added successfully")
            setOpenToast(true)
        }).catch(e=>{
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
        
     }
  }
};



function handleOpen(){
  setOpenAdd(false)
   setSubtitle("")
   setError(false)
   setSucess(true)
   setSameSubtitle(false)
}
return (
  <>
    <BootstrapDialog
    onClose={handleOpen}
    aria-labelledby="customized-dialog-title"
    open={openAdd}
    sx={{maxHeight:"100%"}}
  >
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleOpen}>
      Add a new Subtitle
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <TextField
      required = {success}
      error = {error}
      label="Title of Subtitle"
      placeholder="Title of Subtitle"
      sx={{width:"70%",textAlign:"center",fontStyle:"italic"}}
      multiline={true}
      maxRows={2}
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={(e)=>{setSubtitle(e.target.value)
                        setError(false)
                        setSucess(true)}}/>
     {sameSubtitle && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>*This is subtitle already exists</p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSubmit} sx={{color:"#c50d0d"}}>
        Add
      </Button>
    </DialogActions>
  </BootstrapDialog>
  <ToastMess message={message} />
  </>
)
}
export default DialogSubtitle
