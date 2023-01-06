
import React, {useContext,useState} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import Visa from '../Images/visa3.png'
import { InstructorProfile } from '../Context/InstructorProfile';
const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));



function CardDetails(){

  const {inst, gender, setProfile, setLoading,user,setUser, loading}=useContext(InstructorProfile)
    return( 
      <>
   
    {!loading && inst && 
      
    <Stack direction={"column"} gap={7} paddingBottom={'5%'}>

        <Divider sx={{ fontSize: "1.5rem", marginTop: '2rem'}}> Card Details </Divider>
   <Box sx={{ minWidth: 275 ,ml:"6rem",mr:"6rem"}}>
            <Card variant="outlined"> 
   <CardContent>
    <Stack direction={'row'} gap={"4rem"} justifyContent={'center'} paddingTop={"1rem"} alignItems={"center"}
    paddingBottom={"1rem"}>
    <Box sx={{width:"23%", height:"0%", display:"flex", alignSelf:"center"}}>
    <img src={Visa} alt="Visa/Master Card" width={'100%'}/>
      </Box>
      <Divider orientation="vertical" flexItem color={"#d3d3d3"}/>
       <Stack direction={"column"} gap={2} >
       
       <Typography sx={{fontSize:'28'}} >
           <i style={{marginRight:"0.5rem"}}>Card Number : </i>  ************1234
         </Typography>
         <Typography sx={{fontSize:'28'}}>
         <i style={{marginRight:"0.5rem"}}>Card Holder Name : </i> {user.fName + " " + user.lName}
         </Typography>
         
         <Typography sx={{fontSize:'28'}}>
         <i style={{marginRight:"0.5rem"}}> Expiray Date : </i> 02/2023
         </Typography>
       </Stack>
    </Stack>
         
       </CardContent>
       <CardActions>
       </CardActions>
    </Card>
        </Box>
        </Stack>
        
    }
    </>


        );
   
}

export default CardDetails