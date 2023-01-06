import {useContext,useState} from 'react'
import CreateIcon from '@mui/icons-material/Create';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import Rating from '@mui/material/Rating';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { CardMedia } from '@mui/material';
import Graph from '../Images/graph2.png'
import Rev from './OneComponent/Reviews'
import { InstructorProfile } from '../Context/InstructorProfile';


const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));


function Progress(){
  const {inst, gender, setProfile, setLoading,user,setUser, loading}=useContext(InstructorProfile)
  console.log(inst);
    return (
    <div id="rev">
   
    {!loading && inst && 
<Box>
 <Divider sx={{ fontSize: "1.5rem", paddingBottom:"3%"}} >Progress</Divider>
 <Stack direction="row" gap={0.7} paddingBottom={"4%"}>
       <Typography variant="h5" component="div" paddingRight={"0.5rem"} >
            <RateReviewRoundedIcon sx={{fontSize:"1.5rem", marginRight:"0.5rem", color:"#BBD2B1"}}/>
          My Rating:
         </Typography>
            <Typography sx={{fontSize:"0.87rem"}} paddingTop={"0.3rem"} >{inst.rating.rate.$numberDecimal}</Typography> 
             <Rating 
             name="text-feedback1"
             value={inst.rating.rate.$numberDecimal}//inst.rating.rate.$numberDecimal
             readOnly
            precision={0.5}
             size='small'
            sx={{alignItems:"center"}} />
             <Typography sx={{fontSize:"0.87rem"}} paddingTop={"0.3rem"}>({inst.rating.numberPeople})</Typography>
             </Stack>
             <Box >
             <Rev instructor={inst}/>
             </Box>
             
        <Box alignSelf={"self-end"} paddingTop={'3rem'} >
        <CardMedia
        component="img"
        alt="graph"
      sx={{  height:"50%",width: "80%",
      position: "relative",
      left: "10%",objectFit: "contain", paddingBottom:"4%"}}
        image={Graph}
      />
        </Box>
  </Box>

    }
</div>
   
    
    );
}


export default Progress