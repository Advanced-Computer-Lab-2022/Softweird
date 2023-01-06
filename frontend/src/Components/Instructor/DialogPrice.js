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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


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
const {openPrice,setOpenPrice,courses,setCourse,setReload,setMessage,message} = useContext(InstructorOneCourse)
const [summary,setSummary]=useState("")
const[success,setSucess]=useState(true)
const [empty,setEmpty] =useState(false)
const [checked, setChecked] = useState('');
const [valuePrice, setValuePrice] = useState('');
const [price,setPrice] = useState('')
const [numberError,setNumberError] = useState(false)


const handleSubmit = () => {


  const singleSpaces = summary.replace(/  +/g, " ");
  if(!checked && !price){setSucess(false)
    setEmpty(true)}
  else if(price && (singleSpaces==" " || singleSpaces=="")){
    setSucess(false)
    setEmpty(true)
    
  }
  else if (isNaN(price)){
    setSucess(false)
    setEmpty(true)
    setNumberError(true)

  }


  
     else if (window.confirm("Are you sure you want to edit this summary?")){
        setOpenPrice(false);
        setEmpty(false)
        setSucess(true)
      const p = checked?"Free":valuePrice
        let cancel
        axios({
          method:"PATCH",
          url : '/Instructor/editPrice',
          data : {price:p,courseTitle:courses.title},
          headers : {'Content-Type' : 'application/json'},
          cancelToken: new axios.CancelToken (c => cancel = c)
        }).then (res => {
            setMessage("Summary modified successfully")
            setOpenToast(true)
            setOpenPrice(false)
            setCourse(res.data)
            setReload(true)
        
        }).catch(e=>{
            if(axios.isCancel(e)) return 
        })
        return () => cancel ()
        
     }
  
};


const handleChanging2 = evt => {
      
    setValuePrice(evt.target.value);
    setEmpty(false);
    setSucess(true);
  
 
  console.log(valuePrice)
}

const handleChecked = evt =>{
  if(!checked)
    setPrice(evt.target.checked)
}

const handleChanges = (event) => {
  if(!price)
  setChecked(event.target.checked);
};



const handleClose= ()=>{
    setOpenPrice(false)
}
return (
  <>
  <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={openPrice}
    sx={{maxHeight:"100%"}}
  >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Edit Price
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <FormControlLabel
        label="Free"
        control={
          <Checkbox
      checked={checked}
      onChange={handleChanges}
      inputProps={{ 'aria-label': 'controlled' }}
    />
        }
      />
    <FormControlLabel
        label="Priced"
        control={
          <Checkbox
      checked={price}
      onChange={handleChecked}
      inputProps={{ 'aria-label': 'controlled' }}
    />
        }
      />

   {price && <TextField
      required = {success}
      error = {empty}
      label="Edit Price"
      placeholder="Edit Price"
      id="standard-number"
      type="number"
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      sx={{width:"70%",textAlign:"center",fontStyle:"italic"}}
      multiline={true}
      maxHeight={"2rem"}
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={handleChanging2}/>}
    

     {empty && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* All fields are required.</p>}
    
     {numberError && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* The Price should be a number.</p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSubmit} sx={{color:"#c50d0d"}}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>

    
    


    
      
  <ToastMess message={message} />
  </>
)
}
export default DialogSubtitle
