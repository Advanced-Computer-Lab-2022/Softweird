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
import { styled,IconButton,Checkbox,Stack,Typography } from '@mui/material';
import './Dialog.css'
import axios from 'axios'
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
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function DialogVideo(){

const {setOpenToast}=useContext(Toast)
    const {openVideo,setOpenVideo,courses,setCourse,subtitleSelected,setReload,setLoading,setMessage,message} = useContext(InstructorOneCourse)
    const [videoTitle,setVideoTitle] = useState('')
    const [videoLink,setVideoLink] = useState('')
    const[invalidLink , setInvalidLink] = useState(false)
    const [usedLink,setUsedLink] =useState(false)
    const [usedText,setUsedText] =useState(false)
    const videosTexts = []
    const videosLinks = []
    const subtitles = courses.subtitles
    if(subtitles!==undefined){subtitles.map(subtitle => {
      subtitle.video.map(video =>{
        videosTexts.push(video.text)
      })
    })}
    if(subtitles!==undefined){subtitles.map(subtitle => {
      subtitle.video.map(video =>{
        videosLinks.push(video.link)
      })
    })}
    const [checked, setChecked] =useState(false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const handleSubmit = (e) => {
      console.log(subtitleSelected)
    const singleSpaces = videoTitle.replace(/  +/g, " ");
      if(singleSpaces=="" || videoLink ==""){
        if(videoTitle ==""){
          setSucessVideo(false)
          setErrorVideo(true)
        }
        if(videoLink ==""){
          setSucessLink(false)
          setErrorLink(true)
        }
      }
      else if (videoLink!="" && !validateYouTubeUrl()) {setInvalidLink(true)}
      else {
        console.log(videosLinks)
        if(videosLinks.length!=0 && videosLinks.includes(videoLink)){
          setErrorLink(true)
          setUsedLink(true)}
        if(videosLinks.length!=0 && videosTexts.includes(videoTitle)){
          setErrorVideo(true)
          setUsedText(true)}
        else if(window.confirm("Are you sure you want to add this video?")){         
          setOpenVideo(false);
          setErrorLink(false)
          setErrorVideo(false)
          setInvalidLink(false)
          setSucessLink(true)
          setSucessLink(true)
          setReload(true)
         
          let cancel
          axios({
            method:"PATCH",
            url : '/Instructor/uploadVideo',
            data : {subtitleTitle:subtitleSelected,courseTitle:courses.title,
              videoLink:videoLink,videoDescription:videoTitle,videoLength:0,preview:checked},
            headers : {'Content-Type' : 'application/json'},
            cancelToken: new axios.CancelToken (c => cancel = c)
          }).then (res => {
            setMessage("Video added successfully")
            setOpenToast(true)
              setCourse(res.data)
          }).catch(e=>{
              if(axios.isCancel(e)) return 
          })
          return () => cancel ()

             
         }
        }
      
    };
    

   
    const [successVideo,setSucessVideo] = useState(true)
    const [errorVideo,setErrorVideo] = useState(false)
    const [successLink,setSucessLink] = useState(true)
    const [errorLink,setErrorLink] = useState(false)

    function validateYouTubeUrl() {    
      var url = videoLink;
      if (url != undefined || url != '') {        
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
          var match = url.match(regExp);
          if (match && match[2].length == 11) {
             return true
          } else {
              return false
          }
      }
  }
  function handleLink(e){
    setVideoLink(e.target.value) 
    setInvalidLink(false)
    setErrorLink(false)
    setSucessLink(true)
    setUsedLink(false)

  }
  function handleText(e){
    setVideoTitle(e.target.value) 
    setErrorVideo(false)
    setSucessVideo(true)
    setUsedText(false)

  }
  function handleCloseVideo2(){
      setOpenVideo(false)
      setErrorLink(false)
      setErrorVideo(false)
      setInvalidLink(false)
      setSucessLink(true)
      setSucessLink(true)
      setChecked(false)
  }

return (
    <>
    <div style={{position:"relative"}}></div>
    <BootstrapDialog
    onClose={handleCloseVideo2}
    aria-labelledby="customized-dialog-title"
    open={openVideo} 
    sx={{maxHeight:"100%"}}>
        
    <BootstrapDialogTitle id="customized-dialog-title"onClose={handleCloseVideo2}>
      Add a new Video
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <TextField
      required = {successVideo}
      error = {errorVideo}
      label="Video Title"
      placeholder="Video Title"
      sx={{width:"70%",textAlign:"center",fontStyle:"italic"}}
      multiline={true}
      maxRows={2}
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={handleText}
    
    />
     {usedText && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>*There is already a video with same name</p>}
      <TextField
      required = {successLink}
      error = {errorLink}
      id="youTubeUrl"
      label="Youtube Link"
      placeholder="Youtube Link "
      sx={{width:"70%",textAlign:"center",fontStyle:"italic",mb:"1px"}}
     
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={handleLink}/>
    {invalidLink && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>*Invalid Youtube link</p>}
    {usedLink && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>*There is already a youtubeLink with same name</p>}
    <Stack direction="row" alignItems="center" marginTop="1rem">
      <Typography variant="p">Is Preview:</Typography>
    <Checkbox
        {...label}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
          '&.Mui-checked': {
            color: "#bbd2b1",
          },
        }}
      />
      </Stack>
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
export default DialogVideo
