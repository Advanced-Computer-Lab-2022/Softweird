import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import React, {useContext,useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BadgeIcon from '@mui/icons-material/Badge';
import Rating from '@mui/material/Rating';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Divider from '@mui/material/Divider';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import isEmail from 'validator/lib/isEmail';
import CardMedia from '@mui/material/CardMedia';
import {Currency} from '../Context/Currency'
import { InstructorProfile } from '../Context/InstructorProfile';
import BusinessIcon from '@mui/icons-material/Business';
import FacebookIcon from '@mui/icons-material/Facebook';
import SavingsIcon from '@mui/icons-material/Savings';
import { Tooltip } from '@mui/material';
import { CardHeader } from '@mui/material';
import moneyOwed from '../Images/moneyOwed.png'
import './Wallet.css'
import HistoryIcon from '@mui/icons-material/History';
import HistoryWallet from './HistoryWallet'
import sorryNoHis from '../Images/sorryNoHis.jpg'


function Wallet () {
    var date = new Date
    const [openHis,setOpenHis]=useState(false)
    const {inst, gender, setProfile, setLoading,user,setUser, loading}=useContext(InstructorProfile)
   function handleHis (){
       setOpenHis(true)
   }
    return(
        <Stack >
        
      <Box className="dot" sx={{width:'83%', marginTop: '3rem',left:"8.5%",position:"relative" ,paddingBottom:"4%"}}>
 <div class="wire3"></div>
 {inst.wallet && inst.wallet.some(w=>w.year==date.getFullYear() && w.months.some(m=>m.month == date.getMonth()+1)) ?
 <Card variant="outlined" sx={{borderRadius:" 10px",
    boxShadow:" 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",}}>

          <CardHeader sx={{backgroundColor:"#c50d0d"}} />
          <Box sx={{backgroundColor: "white",
    position: "sticky",
    top: 0,
    zIndex: 2,
    height: "5rem"}}>
          <Stack direction="row" gap={5} width="100%" sx={{pb:"0.5rem",pt:"2rem",pl:"2rem",pr:"2rem"}}>
                      <Typography sx={{fontWeight:"bold",width:" 12rem",
    marginRight: "4rem" ,textAlign:"center"}}>
                          Course
                      </Typography>
                      <Typography sx={{fontWeight:"bold"}}>
                          Money Paid
                      </Typography>
                      <Typography sx={{fontWeight:"bold"}}>
                          Promotion Admin
                      </Typography>
                      <Typography sx={{fontWeight:"bold"}}>
                          Promotion by You
                      </Typography>
                      <Typography sx={{fontWeight:"bold"}}>
                          Total Students
                      </Typography>
                     
                  </Stack>
                  <Divider sx={{    
    borderColor:"rgba(0 0 0/0.6)",position: "relative",
    width: "116%",
    left: "-4rem",margin: "1rem 0rem"}} />
    </Box>
          <CardContent sx={{padding:"2rem 2rem",backgroundColor:"#f1f1f1",maxHeight:"35rem",overflowX:"hidden"}}>
             
              <>

              <Stack gap={"1rem"}>
          

                {inst.wallet.map(w=>{
                 return w.year==date.getFullYear() && 
                 w.months.map(m=>{
                    return m.month==date.getMonth()+1 &&

                    m.amounts.map(c=>{

                   return  <> 
                  <Stack direction="row">
                      <Box sx={{    width: "15rem",overflowWrap: "break-word"}}>
                      <Typography sx={{textAlign:"center"}}>
                        <i> {c.course} </i> 
                      </Typography></Box>
                      <Stack gap={"1rem"}>
                      {c.moneyPaid.map(co=>{

                  return <><Stack direction="row" paddingLeft={"4.8rem"}>
                      <Box sx={{ marginRight: "2rem",
    width: "5.5rem",textAlign:"center"}}>
                      <Typography>
                         {co.money.$numberDecimal}
                      </Typography></Box>

                     

                      <Box sx={{ marginRight: "2rem",
    width: "8.5rem",textAlign:"center"}}>
                      <Typography>
                          {co.promotionAdded.admin.$numberDecimal} %
                      </Typography></Box>

                      <Box sx={{ marginRight: "2rem",
    width: "8.5rem",textAlign:"center"}}>
                      <Typography>
                      {co.promotionAdded.inst.$numberDecimal} %
                      </Typography></Box>

                      <Box sx={{ marginRight: "2rem",
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
    borderColor:" #839b78"}}/></>
              }) }) })}


              </Stack>
</>
          </CardContent>
          </Card>:
          <>
       
          <Card >
              <CardContent>
                  <Stack direction="row" alignItems= "center"
          gap= "1rem"
          justifyContent= "center">
                 <Typography sx={{textAlign:"center"}}><b>Sorry, There was no registerations this month</b> </Typography> 
                 <img src={sorryNoHis} style={{width:"5%"}} />
                 </Stack>
                 
              </CardContent>
          </Card>
          </>}
          </Box>
         
          <div className='="text-end' style={{textAlign:"end"}}>
          <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined" startIcon={<HistoryIcon sx= {{color:"#bbd2b1"}}/>} sx={{color:"#000",
     border:"1px solid rgba(197, 13, 13, 0.8)" , mr:"8.5%",
    '&:hover':{
     border:"1px solid rgba(197, 13, 13)" 
      }}} onClick={handleHis}>
        View Payments History
      </Button>
          </div>
          {<HistoryWallet openHis={openHis} setOpenHis={setOpenHis}/>}
        </Stack>
    )
}
export default Wallet