import {useEffect} from 'react'
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
import { styled,IconButton, Typography } from '@mui/material';
import ReactPlayer from "react-player";
import { OneCourseResult } from '../../Context/OneCourseResult';
import { Container } from '@mui/material';
import Loading from './Loading';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),

  },
  '& .MuiPaper-root' :{
      width:"60%",
      height:"90%",
      maxWidth:"80%",
      maxHeight:"90%",
      border:"0.8rem solid",
     



  }
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

function PreviewVideo ({previews}){
    
   
    const subInd = previews.subInd
    const [ind,setInd]=useState (previews.index)
    const subtitles = previews.subtitles[subInd]
    const type = previews.type
    const preview = previews.previews
    const videos =(type=="instructor edit"? subtitles.video:preview)
    const [link,setlink] = useState(videos[ind].link)
    const [title , setTitle] = useState(videos[ind].text)
    const[loading,setLoading]=useState(false)
    var counter = ind
    const [next ,setNext] = useState(false)
  

const {open,setOpen} = useContext(OneCourseResult)
const handleClose = () => {
        setOpen(false);
        setNext(false)
     }
const [index,setIndex] = useState()
useEffect(()=>{
    setlink(videos[ind].link)
    setTitle(videos[ind].text)
    


},[ind])
function looping(e) {
    counter++
    if (counter <= videos.length-1){
     
        setInd(counter)
        setNext(true)
        
    }
   
   
  
}



return (
    <BootstrapDialog
    onClose={()=>{setOpen(false)}}
    aria-labelledby="customized-dialog-title"
    open={open}
    className="preview"
    
  >
    {type == "instructor edit"?<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Course Contents
    </BootstrapDialogTitle>:<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Course Previews
    </BootstrapDialogTitle>}
    
    <Container display="flex">
    <DialogContent dividers >
    {loading && next &&<button class="btn btn-primary" type="button" disabled style={{backgroundColor:"#fff",borderColor:"#fff",color:"#000",
position:"absolute",left:"41%",top:"38%"}}>
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Next Video...
</button>}
 <ReactPlayer url={link} 
  width= {"100%"} controls onEnded={looping} onBuffer={()=>{ setLoading(true)}} 
  onPlay={()=>{setLoading(false) 
              setNext(false)}} playing/> 
    </DialogContent>
    </Container>
    <Typography variant="h5" color="#EC6A37" sx={{paddingLeft:"6%",fontSize:"1.4rem"}}>
        {title}

    </Typography>
  </BootstrapDialog>
)
}
export default PreviewVideo
