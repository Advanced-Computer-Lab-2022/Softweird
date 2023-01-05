import {Navigate, useParams,useNavigate} from "react-router-dom"
import './MostViewed.css'
import SkeletonsList from './SkeletonsList';
import React from "react";
import photo from '../../Images/Coding.jpg'
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Divider,Card, CardContent ,CardMedia} from "@mui/material";
//import Icon from '@material-ui/core/Icon';
import cs from '../../Images/Computerscience1.jpg'
import math from '../../Images/Mathematics1.jpg'
import sci from '../../Images/Science1.png'
import cybers from '../../Images/Cybersecurity1.png'
import buis from '../../Images/Buisness1.png'
import ds from '../../Images/Datascience1.png'
import ai from '../../Images/ArtificialIntelegence1.png'
import cc from '../../Images/Cloudcomputing1.png'


function Subjectsss (){
  const MenuItem = [
    { label: "Computer Science", icon: cs },
    { label: "Mathematics", icon: math },
    { label: "Science", icon: sci },
    { label: "CyberSecurity", icon: cybers },
    { label: "Buisness", icon: buis },
    { label: "Data Science", icon: ds },
    { label: "Artifial Inteligence", icon: ai },
    { label: "Cloud Computing", icon: cc }
  ];

  

      return (<>
        <Typography sx={{ fontSize: 30,fontWeight:"bold", marginBottom:'2%',marginTop:'0%'}} color="000">
           Subjects </Typography>
        <ImageList sx={{ width: 1076, height: 643 ,gridTemplateColumns:"repeat(4, 1fr)!important",gap:"90px !important "}}>
          {MenuItem.map((item) => (
            <Card  key={item.img} onClick={() => window.location.href=`/Search?search=${item.label}`} sx={{height:"17rem","&:hover":{
              cursor: "pointer",
          
          } }}>
           <CardMedia component={"img"} image={item.icon}   alt={item.label} sx={{width:"100%",height:"12rem"}}/>
              
            <CardContent sx={{pt:"1.5rem"}} >
              <Typography sx={{textAlign:"center"}}color="text.secondary">{item.label}</Typography>
            </CardContent>
            </Card>
          ))}
        </ImageList></>
      );
   }
export default Subjectsss