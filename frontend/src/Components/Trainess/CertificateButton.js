import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { useAuth } from '../auth';
import jsPDF from 'jspdf'
import Certificate from '../../Images/Certificate.png'
import { useEffect ,useState} from 'react';
export default function CertificateButton({course,myCourse}){

  const [date,setDate]=useState()
    const auth=useAuth()
    useEffect(()=>{
    if(myCourse.length!=0){
     myCourse.courseInfo.map(c=>{
       if(c.course==course._id){
      console.log(c.cerDate)
         setDate(c.certDate.slice(0,10))
     
      
       }
     })
    }
    

    },[])


  const downloadCert =()=>{
        var doc=new jsPDF('landscape', 'px', 'a4','false');
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
       // doc.setFont('RockSalt-Regular', 'normal');
        doc.addImage(Certificate,'PNG',0,0,width,height)
        
        doc.text(280,250, auth.user.fName + " "+ auth.user.lName)
        doc.text(260,327,course.title)
        doc.text(290,360,date)
        doc.save('certificate.pdf')
     }

      return(
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal" variant="outlined" startIcon={<DownloadIcon sx= {{color:"#bbd2b1"}}/>} sx={{color:"#000",
        border:"1px solid rgba(197, 13, 13, 0.8)" ,
       '&:hover':{
        border:"1px solid rgba(197, 13, 13)" 
         }}} onClick={downloadCert}>
           Download Certificate
         </Button>
      )
}