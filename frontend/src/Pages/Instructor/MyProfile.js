import axios from 'axios';
import React,{ useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ReviewsIcon from '@mui/icons-material/Reviews';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardDetails from '../../Components/CardDetails ';
import PersonalInfo from '../../Components/PersonalInfo';
import Reviews from '../../Components/Progress';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Currency} from '../../Context/Currency'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import {Divider} from '@mui/material';
import {AppBar} from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import {HashLink as Link} from 'react-router-hash-link';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import isEmail from 'validator/lib/isEmail';
import {InstructorProfile} from '../../Context/InstructorProfile'
import PropTypes from 'prop-types';
import validator from 'validator';
import CloseIcon from '@mui/icons-material/Close';
import ToastMess from '../../Components/OneComponent/ToastMess';
import { Toast } from '../../Context/Toast';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import {FormControl} from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import Loading from '../../Components/OneComponent/Loading';
import { useAuth } from '../../Components/auth';
import { useInView } from "react-intersection-observer";

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

function MyProfile (){

    const [value, setValue] = useState(0);
const[loading,setLoading]=useState(true)

const ref1 = useRef(null);
const ref2 = useRef(null);
const ref3 = useRef(null);
const ref4 = useRef(null);
const [message,setMessage] =useState('')
const {setOpenToast} = useContext(Toast)
const [email,setEmail] =useState("")
const [showPassword, setShowPassword] = React.useState(false);
const auth= useAuth();
const handleClickShowPassword = () => {console.log(showPassword);
    setShowPassword(!showPassword)};
const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
const scrollDown = (ref) => {
  if(ref===ref1){
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  else{
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  }
 
};

    const handleChange = (event, newValue) => {
    
        setValue(newValue);
      };
    
      const [open, setOpen] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);
      const [inst,setProfile] = useState([]);  
      const [user, setUser] = useState([]);
      const [pass, setPass] = useState('');
      const [pass2, setPass2] = useState('');
      const[gender, setGender] = useState(false);
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      const [formData, setFormData] = useState('');
      const [errored, setError] = useState(false);
      const[error, setErrored] = useState(false);   //Password strong
const[success,setSucess]=useState(true)
const[empty, setEmpty] = useState(false);

// const [ref, inView] = useInView({
//     threshold: 0.1
//   });

//   const [ref2, inView2] = useInView({
//     threshold: 0.1
//   });

//   const [ref3, inView3] = useInView({
//     threshold: 0.1
//   });

//   const [ref4, inView4] = useInView({
//     threshold: 0.1
//   });

//   const activeTab = () => {
//     if (inView) {
//       setValue(0);
//     } else if (inView2 && !inView) {
//       setValue(1);
//     }
//     else if (inView3 && !inView) {
//         setValue(2);
//       }
//       else if (inView4 && !inView) {
//         setValue(3);
//       }
//   };

      useEffect(() =>{
        setLoading(true)
       console.log(auth.user.type)
        let cancel
         axios({
             method:"GET",
             url : `/Instructor/myProfile/${auth.user.id}`,
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
        
             setLoading(false)
             setProfile(res.data)
             setUser(res.data.user)
             setEmail(res.data.user.email)
             console.log(res.data.user, "proo")
             console.log(res.data, "data")
             console.log(res.data.rating, "rating")
             if(res.data.user.gender==="Female"){
              setGender(true)
             }
             console.log(res.data)
            
         }).catch(e=>{
          console.log(e);
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
     }, []);

    
      const handleClickOpen = () => {
        setOpen(true);
        setEmpty(false);
        setSucess(true);
          setError(false);
        setErrored(false);
      };

      const handleClickOpenEdit = () => {
        setOpenEdit(true);
        setEmpty(false);
        setSucess(true);
      
      };
    
      const handleClose = () => {
        setOpen(false);
        setOpenEdit(false);
      };
  

      const handleChangeField = evt => {

        setSucess(true);
        setEmpty(false);
        setFormData(evt.target.value);
        console.log(formData, "ana aho")
      };


      const handleChangePass = evt => {
        setEmpty(false);
        setSucess(true);
        setError(false);
        setErrored(false);
       setPass(evt.target.value);
     
      };
      const handleChangePass2 = evt => {
        setEmpty(false);
        setSucess(true);
        setError(false);
        setErrored(false);
        setPass2(evt.target.value);
        console.log(pass, "ana pass2222")
       };


    //    const pdfGenerate=()=>{
    //       var doc=new jsPDF('landscape', 'px', 'a4','false');
    //       var width = doc.internal.pageSize.getWidth();
    //       var height = doc.internal.pageSize.getHeight();
    //       doc.addImage(color,'PNG',0,0,width,height)
    //       doc.addFileToVFS("RockSalt-Regular-normal.ttf", myFont);
    //       doc.addFont("RockSalt-Regular-normal.ttf", "RockSalt-Regular", "normal");
    //       doc.setFont("RockSalt-Regular");
    //       doc.setFont('RockSalt-Regular', 'normal');
          
         
    //       doc.text(280,250, "Mariam" + " "+ "Tamer")
    //       doc.text(280,327,"Course Name")
    //       const pdfOut = doc.output("datauristring");
    //       doc.save('a.pdf')
          
    //       let cancel
    //           axios({
    //               method:"POST",
    //               url : "Individual/sendMail",
    //               data : {pdf:pdfOut},
    //               headers : {'Content-Type' : 'application/json'},
    //               cancelToken: new axios.CancelToken (c => cancel = c)
    //           }).then (res => {
             
                
    //           }).catch(e=>{
    //               console.log(e)
    //                if(axios.isCancel(e)) return 
                   
              
    //           })
        
    //           return () => cancel ()
         
    //     }

    //     const downloadCert =()=>{
    //       var doc=new jsPDF('landscape', 'px', 'a4','false');
    //       var width = doc.internal.pageSize.getWidth();
    //       var height = doc.internal.pageSize.getHeight();
    //      doc.addImage(paper,'JPG',0,0,width,height)
          
    //      doc.setFont("courier","bolditalic" );
    //      doc.setFontSize(35);
    //       doc.text(250,33,"Course Name")

    //       doc.setFont("times", "italic");

    //       doc.setFontSize(22);
    //       doc.text(240,76, "Subtitles Name" + " (Video Title)")
    //       doc.setFont("times", "roman");

    //       doc.setFontSize(18);
    //       doc.text(30,122,"This is jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    //       doc.save('notes.pdf')
    //     }

  const handleConfirm = evt => {
      console.log(pass)
    if(pass == ""|| pass==" " || pass2=="" || pass2==" " ){
              setEmpty(true);
              setError(false)
              setErrored(false)
              setSucess(false);
    }
    else if (!validator.isStrongPassword(pass, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        setErrored(true)
        setEmpty(false);
        setError(false)
        setSucess(false);
    } 
         else if(pass != pass2){
            setError(true);
                  setSucess(false);
                  setErrored(false)
                  setEmpty(false);

        }
          else{
          
         if(window.confirm("Are You sure you want to change your password")){
            setError(false);
            setSucess(true);
            setEmpty(false);
            setErrored(false);
          evt.preventDefault();
          setOpen(false)
              setLoading(true)
              const data = pass
              console.log(data, "yess")
              let cancel
              axios({
                  method:"PATCH",
                  url : `Instructor/updateMyPass/${auth.user.id}`,
                  data : {password:data},
                  headers : {'Content-Type' : 'application/json'},
                  cancelToken: new axios.CancelToken (c => cancel = c)
              }).then (res => {
                //setLoading(false)
                setLoading(false)
                setUser(res.data)
                setOpenToast(true)
                setMessage("Password updated successfully")
                
              }).catch(e=>{
                  console.log(e)
                   if(axios.isCancel(e)) return 
                   
              
              })
        
              return () => cancel ()
        }}
      }
       
      
      const handleSubmit = evt => {
        
  if(formData=="" || formData==" "){
    setEmpty(true);
  
    setSucess(false);
  }

    else {
        if(window.confirm("Are You sure you want to edit your biography")){
        evt.preventDefault();
        setOpenEdit(false)
        setEmpty(false);
        setError(false);
        
            setLoading(true)
            const data = formData
            let cancel
            axios({
                method:"PATCH",
                url : `Instructor/updateMyBiography/${auth.user.id}`,
                data : {biography:data},
                headers : {'Content-Type' : 'application/json'},
                cancelToken: new axios.CancelToken (c => cancel = c)
            }).then (res => {
              setLoading(false)
              setProfile(res.data)
              setOpenToast(true)
              setMessage("Biography updated successfully")
            }).catch(e=>{
                console.log(e)
                 if(axios.isCancel(e)) return 
                 
            
            })
      
            return () => cancel ()
      }
    }
    }

    
     const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
      ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: '000',
        '&.Mui-selected': {
          color: '#000000',
        },
        '&:hover': {
          color: '#bbd2b1',
          opacity: 1,
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
      }),
    );

    

      const StyledTabs = styled((props) => (
        <Tabs
          {...props}
          TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
        />
      ))({
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
       
          
        },
        '& .MuiTabs-indicatorSpan': {
          maxWidth: '50%',
          width: '100%',
          backgroundColor: '#bbd2b1',
        },
      });
      
   
      

      const card2 = (
        <Card >
       <CardContent >
           
             <Typography variant="h5" component="div" sx={{fontWeight:"bold",pb:"0.5rem"}}>
              Biography 

              <Tooltip title="edit biography">
               <IconButton  aria-label="edit" onClick={handleClickOpenEdit}>
               <CreateIcon sx={{fontSize:"1.2rem", marginLeft:"0.5rem"}}/>
              </IconButton>
              </Tooltip>
              
             </Typography>
             
             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             {inst.biography}
             </Typography>
           </CardContent>
           <CardActions>
           
           </CardActions>
        </Card>
       
       );

      
    return (
      <>
     { inst && !loading && user &&
     <InstructorProfile.Provider value={{inst,gender, setProfile, setLoading,user,setUser,email,setEmail,setMessage, loading }}>
    
      <AppBar position="fixed" sx={{pt:"3%!important",backgroundColor:"white",boxShadow:"none",mb:"2rem",pb:"1rem",top:{xl:"5.8rem",
      lg:"6.8rem",md:"6.8rem",sm:"5.8rem",xs:"4rem"},
      boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"}}>
   
   <StyledTabs
    centered
     value={value}
     onChange={handleChange}
     aria-label="styled tabs example" >
      
       <StyledTab   label="Personal Info" onClick={() => scrollDown(ref1)}/> 
      
       
       <StyledTab  label="Security" onClick={() => scrollDown(ref2)}/> 
       
      
    <StyledTab  label="Progress" onClick={() => scrollDown(ref3)} /> 
    
   
  <StyledTab  label="Card Details" onClick={() => scrollDown(ref4)}/>
  
   </StyledTabs>
   </AppBar>
  
        

      <Stack direction={"column"} position={"relative"} sx={{marginTop:'12%'}} >
       
      <div ref={ref1}>
      <PersonalInfo />
        </div>
        
        
          <Stack direction={"row"} gap={1} sx={{paddingTop:'1.2rem', paddingBottom:'2rem', position:"relative", alignItems:"center"}} >
        <Stack direction={"row"} sx={{paddingRight:'1rem'}}>
        <DirectionsWalkIcon />
         < CampaignRoundedIcon/>
        </Stack>
       
        <Box sx={{ width: '100%', paddingBottom:"2rem", paddingTop:"2rem",pl:"1.5rem",pr:"6rem"}}  >
             <Card variant="outlined" sx={{overflow:'auto'}}>{card2}</Card> 
        </Box>
          </Stack>
          <Box sx={{width:'100%'}}>   
          <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={openEdit}
 
    sx={{maxHeight:"100%"}}
  >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Edit Biography
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <TextField
      required = {success}
      error = {empty}
      label="New Bio"
      placeholder="New Bio"
      sx={{width:"90%",textAlign:"center",fontStyle:"italic"}}
      multiline={true}
      maxHeight={"2rem"}
      variant="outlined"
      id="outlined-basic"
      fullWidth
      margin="dense"
      autoFocus
      defaultValue={inst.biography}
      onChange={handleChangeField}/>
    

     {empty && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* All fields are required.</p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleSubmit} sx={{color:"#c50d0d"}}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>

    
          </Box>
          
          

        
         


<div ref={ref2} >
       
          <Divider sx={{ fontSize: "1.5rem", paddingBottom:"2.4rem"}} >Security</Divider>
    
          <div   >
          <Stack direction={"row"} gap={5} sx={{alignItems:"center", paddingBottom:"2.4rem",justifyContent:"center"}}>
         
            <Button variant="outlined" onClick={handleClickOpen} startIcon={ <LockIcon sx={{fontSize:"1.2rem", color:'#bbd2b1'}}/>} 
             sx={{color:"#000" , border:"1px solid rgba(187, 210, 177, 0.8)" ,
             '&:hover':{
              border:"1px solid rgba(187, 210, 177)" 
             }}}> 
            
        Change Password

      </Button>
            </Stack>

            <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    sx={{maxHeight:"100%"}}
  >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      Change Password
    </BootstrapDialogTitle>
    <DialogContent dividers sx={{width:"30rem"}}>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard"  autoComplete={"off"} >
          <InputLabel htmlFor="standard-adornment-password">* Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
           
            autoComplete='new-password'
             
            onChange={handleChangePass}
            required = {success}
            error = {empty || error || errored} 
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" autoComplete={"off"}>
          <InputLabel htmlFor="standard-adornment-password">* Confirm Password</InputLabel>
          <Input
            id="standard-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChangePass2}
            fullWidth
            required = {success}
            error = {empty || error || errored} 
          
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {empty && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* All fields are required.</p>}
     {errored && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Confirmation password doesn't match!!</p>}
     {error && <p style={{color:"red" , marginLeft:"1rem",fontSize:"0.8rem",marginBottom:0}}>* Password is weak, Use 8 or more characters with a mix of letters, numbers & symbols </p>}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleConfirm} sx={{color:"#c50d0d"}}>
        Submit
      </Button>
    </DialogActions>
  </BootstrapDialog>


          </div>
    </div>
<div ref={ref3}>
   
  <Reviews />

</div>

     <div ref={ref4}>
     <CardDetails  />
     </div>
   
      
        </Stack>
      <ToastMess message={message} />
        </InstructorProfile.Provider> }
        {loading &&<Loading /> }
        </>
    );
       
}



export default MyProfile