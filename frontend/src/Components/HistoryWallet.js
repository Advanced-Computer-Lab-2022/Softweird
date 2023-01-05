import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useContext } from 'react';
import { useState ,useEffect} from 'react';
import $ from 'jquery';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {Box,Button, Card, CardMedia} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { YearPicker } from '@mui/x-date-pickers/YearPicker';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { TextFieldProps,Stack,CardContent } from '@mui/material';
import { InstructorProfile } from '../Context/InstructorProfile';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "./HistoryWallet.css"
import sorryNoHis from '../Images/sorryNoHis.jpg'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const minDate = dayjs('2020-01-01T00:00:00.000');
  const maxDate = dayjs('2034-01-01T00:00:00.000');
  

export default function HistoryWallet({openHis ,setOpenHis}) {

   const [date, setDate] = React.useState(dayjs('2023-01-04'));
  //const [date, setDate] = React.useState(dayjs(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()}`));
    const [value, setValue] = React.useState(new Date());
    const {inst, gender, setProfile, setLoading,user,setUser, loading}=useContext(InstructorProfile)
 
   function handleClose(){
       setOpenHis(false)
   }
  return (
    <div>
   
      <Dialog
        fullScreen
        open={openHis}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{backgroundColor:"lightgray"}}
      >
        <AppBar sx={{ position: 'relative' ,backgroundColor:"#c50d0d" ,position:"sticky",top:0}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
               Wallet History 
            </Typography>
            
          </Toolbar>
        </AppBar>
        <Stack direction="row" gap={"11rem"}>
        <Box  sx={{    width: "30%",
    position: "relative",
    left:"5%",
    top: "7.5rem"
}}>
      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DesktopDatePicker 
      label="Date"
      inputFormat='MM/YY'
      value={value}
      onChange={setValue}
      renderInput={(TextFieldProps)=>{
          return <TextField {...TextFieldProps} />
      }}
      views={["month","year"]}
      /> */}
      <Card sx={{minHeight: "19rem",maxHeight:"fit-content",
    width: "100%"
}}>
 <CalendarPicker date={date} onChange={(newDate) => {setDate(newDate)}} views={["month","year"]} maxDate={new Date()} minDate={inst.createdAt}

/>
</Card>
    </LocalizationProvider>
 
  
  </Box>

  
  <Box sx={{position: "relative",    zIndex: 2,
    width: "52%",
    top: "10%"}}>
        {inst.wallet && inst.wallet.some(w=>w.year==date.$y && w.months.some(m=>m.month == date.$M+1)) ?
    <Card className="stack1">
        <CardMedia />
        <p className="stack2"></p>
        <Box sx={{backgroundColor: "white",
    position: "sticky",
    top: 0,
    zIndex: 2,
    height: "5.2rem"}}>
          <Stack direction="row" gap={"1.5rem"} width="100%" sx={{pt:"2rem",pr:"1rem",pl:"1rem"}}>
                      <Typography sx={{fontWeight:"bold",width:" 12rem",
    fontSize:"0.9rem",textAlign:"center"}}>
                          Course
                      </Typography>
                      <Typography sx={{fontWeight:"bold",fontSize:"0.9rem",textAlign:"center",width:"4rem"}}>
                          Money Paid
                      </Typography>
                      <Typography sx={{fontWeight:"bold",fontSize:"0.9rem",textAlign:"center",width:"4.5rem"}}>
                          Promotion Admin
                      </Typography>
                      <Typography sx={{fontWeight:"bold",fontSize:"0.9rem",textAlign:"center",width:"4.5rem"}}>
                          Promotion by You
                      </Typography>
                      <Typography sx={{fontWeight:"bold",fontSize:"0.9rem",textAlign:"center",width:"6.5rem"}}>
                          Total Students
                      </Typography>
                     
                  </Stack>
                 
    </Box>
    <CardContent sx={{padding:"2rem 1rem",backgroundColor:"#f1f1f1",maxHeight:"35rem",overflowX:"hidden"}}>
              
              <>
        
       
            

              <Stack gap={"1rem"}>
          

                {inst.wallet.map(w=>{
                 return w.year==date.$y && 
                 w.months.map(m=>{
                    return m.month==date.$M+1 &&

                    m.amounts.map(c=>{

                   return  <> 
                  <Stack direction="row" gap={"1.5rem"}>
                      <Box sx={{    width: "12rem",overflowWrap: "break-word"}}>
                      <Typography sx={{textAlign:"center"}}>
                        <i> {c.course} </i> 
                      </Typography></Box>
                      <Stack gap={"1rem"}>
                      {c.moneyPaid.map(co=>{

                  return <><Stack direction="row" gap={"1.5rem"}>
                      <Box sx={{ 
    width: "4rem",textAlign:"center"}}>
                      <Typography>
                         {co.money.$numberDecimal}
                      </Typography></Box>

                     

                      <Box sx={{
    width: "4.5rem",textAlign:"center"}}>
                      <Typography>
                          {co.promotionAdded.admin.$numberDecimal} %
                      </Typography></Box>

                      <Box sx={{
    width: "4.5rem",textAlign:"center"}}>
                      <Typography>
                      {co.promotionAdded.inst.$numberDecimal} %
                      </Typography></Box>

                      <Box sx={{
    width: "6.5rem",textAlign:"center"}}>
                      <Typography>
                         {co.totalStudents}
                      </Typography></Box>
                      
                      </Stack>
                   </>

                          })}
                           </Stack> 
                 
                  </Stack>

              
              <Divider sx={{borderBottomWidth: "medium",
    borderColor:" #839b78"}}/>
              
              <Stack sx={{position:" relative",gap:"1rem"
}}>
              <Stack direction="row" gap={3} sx={{justifyContent:"end",
    }}>
             <Typography sx={{fontSize:"0.85rem",color:"#c50d0d"}}><i>Total Payments :</i></Typography>
              <Typography sx={{fontSize:"0.85rem"}}><i>Total Students :</i> {c.totalStudents?c.totalStudents:"0"}</Typography>
              <Typography sx={{fontSize:"0.85rem"}}><i>Total Money:</i> {c.total?c.total:"0"}</Typography>
             
              </Stack>

              <Stack direction="row" gap={3} sx={{justifyContent:"end",
    }}>
                <Typography sx={{fontSize:"0.85rem",color:"#c50d0d"}}><i>Total Refunds :</i></Typography>
              <Typography sx={{fontSize:"0.85rem"}}><i>Total Students  :</i> {c.totalRefundStudents?c.totalRefundStudents:"0"}</Typography>
              <Typography sx={{fontSize:"0.85rem"}}><i>Total  Money:</i> {c.totalRefunds?c.totalRefunds:"0"}</Typography>
             
              </Stack>
              <div style={{ width: "15%",
    textAlign: "center",
    position: "relative",
    right: "-86%"}}>
              <Divider sx={{    
    borderColor:"rgba(0 0 0/0.6)"}} />
     </div>
     <Stack direction="row" gap={3} sx={{justifyContent:"end",}}>

              <Typography sx={{fontSize:"0.85rem"}}><i style={{color:"#c50d0d"}}>Net Balance :</i> {c.totalRefunds&&c.total?(c.total-c.totalRefunds):(c.totalRefunds&&!c.total?("-"+c.totalRefunds):(!c.totalRefunds&&c.total?c.total:0))}</Typography>

              </Stack>

              </Stack>
   
              
              <Divider sx={{borderBottomWidth: "medium",
    borderColor:" #839b78"}}/> </>
              }) }) })}


              </Stack>
</>
          </CardContent>

    </Card>:<>
    <div className="wireH"></div>
    <Card className="card-H " sx={{    paddingTop: "2rem",
    position: "relative",
    top: "4rem"}}>
        <CardContent>
            <Stack direction="row" alignItems= "center"
    gap= "1rem"
    justifyContent= "center">
           <Typography sx={{textAlign:"center"}}><b>Sorry , There was no registerations this month</b> </Typography> 
           <img src={sorryNoHis} style={{width:"5%"}} />
           </Stack>
           
        </CardContent>
    </Card>
    </>
    }
</Box> 

  </Stack>
      </Dialog>
    </div>
  );
}