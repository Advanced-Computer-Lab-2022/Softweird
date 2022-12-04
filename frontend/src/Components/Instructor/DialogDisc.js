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
import { styled,IconButton,Stack} from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import InputAdornment from '@mui/material/InputAdornment';


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

function DialogDisc (){


const {openDisc,setOpenDisc} = useContext(InstructorOneCourse)
const [promotion,setPromotion]=useState("")
const [date,setDate] =useState("")
const[success,setSucess]=useState(true)
const [error,setError] =useState(false)
const [numberError , setNumberError] = useState(false)
const [numberMax , setNumberMax] = useState(false)
const [dateError , setDateError] = useState(false)
const handleClose = () => {
  const singleSpaces = promotion.replace(/  +/g, " ");
  if(singleSpaces==" " || singleSpaces==""){
    setSucess(false)
    setError(true)
  }
  else if (isNaN(promotion)){
    setSucess(false)
    setError(true)
    setNumberError(true)

  }
  else if (promotion > 100 ){
    setSucess(false)
    setError(true)
    setNumberMax(true)

  }
  else if (window.confirm("Are you sure you want to set promotion?")){
        setOpenDisc(false);
        setError(false)
        setSucess(true)
     }
  }
function handleCloseAll () {
    setError(false)
    setSucess(true)
    setPromotion("")
    setNumberError(false)
    setNumberMax(false)
    setOpenDisc(false)
}
function changeProm (e){
    setPromotion(e.target.value)
    setError(false)
    setSucess(true)
    setNumberError(false)
    setNumberMax(false)
    
}
function changeDate(e){
  setDate(e.target.value)
  console.log(e.target.value)
}


return (
    <BootstrapDialog
    onClose={handleCloseAll}
    aria-labelledby="customized-dialog-title"
    open={openDisc}>
    
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAll}>
      Apply a Promotion
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
   
    <TextField
      required = {success}
      error = {error}
      label="Promotion of course"
      placeholder="Promotion of course"
      sx={{width:"70%",textAlign:"center",fontStyle:"italic"}}
      InputProps={{ endAdornment:<InputAdornment position="end">%</InputAdornment>}}
      multiline={true}
      maxRows={2}
      variant="standard"
      fullWidth
      margin="dense"
      autoFocus
      onChange={changeProm}/>
       {numberError && <p style={{color:"red" , marginLeft:"1rem"}}>*Should be a number</p>}
       {numberMax && <p style={{color:"red" , marginLeft:"1rem"}}>*Maximum promotion is 100%</p>}
      <TextField
        id="date"
        label="Expiry Date *"
        type="date"
        variant="standard"
        fullWidth
        margin="dense"
        autoFocus
        
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{min:new Date().toISOString().slice(0,10)}}
        onChange ={changeDate}
        sx={{width:"70%",textAlign:"center",fontStyle:"italic",mt:"7%",mb:"4%"}}
      />
     

      
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose} sx={{color:"#EC6A37"}}>
        Add
      </Button>
    </DialogActions>
  </BootstrapDialog>
)
};
export default DialogDisc
