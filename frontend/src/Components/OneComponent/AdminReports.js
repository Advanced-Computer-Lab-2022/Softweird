import {Navigate, useParams,useNavigate} from "react-router-dom"
import './MostViewed.css'
import SkeletonsList from './SkeletonsList';
import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import photo from '../../Images/Coding.jpg'
import tech from '../../Images/technical.jpg'
import CircleIcon from '@mui/icons-material/Circle';
import finan from '../../Images/finan.png' 
import others from'../../Images/others.png'
import Slider from "react-slick";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReportIcon from '@mui/icons-material/Report';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useState, useEffect, Component, useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Loading from "./Loading";
import { useAuth } from "../auth";
import { Divider } from "@mui/material";

function AdminReports (){
    const [reports,setReports]=useState([])
    const [course,setCourse]=useState([]) 
    const params = new URLSearchParams(window.location.search);
    const [loading,setLoading] = useState(true);
    const auth =useAuth()
  
    const navigate = useNavigate()
let icon

    useEffect(() =>{
        setLoading(true)
         let cancel
         axios({
             method:"GET",
             url : '/Admin/getreports',
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
             console.log(res.data.r)
             var rep = (res.data.r.filter(r=>r.solved=="noStatus"))
             
             setReports(rep)

         }).catch(e=>{
            
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
     }, [])
     const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow: Math.min(4,reports.length),
        slidesToScroll: Math.min(4,reports.length)
      };
      return (
        
        <>
        {!loading && reports.length!==0 ?
         <div>
          <Typography sx={{ fontSize: 30, marginBottom:'2%',marginTop:'0%'}} color="000">
             No-Status Reports 
           </Typography>
           <Divider sx={{borderWidth: "1px",marginBottom: "4%"}}/>
          <Slider {...settings} sx={{  height:'30%'}}>
            {reports.map(report =>{
                
                {report.type==="Financial"?
               icon=finan
               :  report.type==="Technical"?
               icon= tech 
                :icon=others  }
                
          return <>
          {report.solved==="noStatus" && <div>
            
          <Card sx={{ maxWidth: 230 , maxHeight: 500}}>
          
          <CardMedia
            sx={{ height: 230,width: 230}}
            component="img"
            image={icon}
            
            title="green iguana"
          />
           

          <CardContent sx={{pt:0}}>
            <Typography gutterBottom variant="h6" component="div">
            {report.title.slice(0,15)} {report.title.length>=15 ? <span>...</span> :<></>}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: "0.8rem",fontWeight: 'bold'}}>
            Reporter : {report.reporter.fName} {report.reporter.lName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{lineHeight: "2",fontStyle: 'italic',mt:"1rem"}}>
            {report.followUp.length===0?
          <CircleIcon sx={{color:"red",width:"8%",mr: "4%"}}/>:<CircleIcon sx={{color:"green",width:"8%",mr: "4%"}}/>}FollowUp Messages 
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Read More</Button>
          </CardActions>
        </Card></div>}</>})}
            </Slider>
        </div> 
         :<> 
        {!loading && <>
         <div>
          <Typography sx={{ fontSize: 30, marginBottom:'4%',marginTop:'0%'}} color="000">
            No-Status Reports <br/>
           </Typography>
           </div>
           
            <h6> All the reports are currently resolved or pending</h6>
            </>}
        </>}
        </>
    )
}
export default AdminReports