import DownloadIcon from '@mui/icons-material/Download';
import { Button,IconButton,Tooltip } from '@mui/material';
import { useAuth } from '../auth';
import jsPDF from 'jspdf'
import Certificate from '../../Images/Certificate.png'
import { useEffect ,useState} from 'react';

export default function CertificateSm({course,myCourse,downloadCert}){

  const [date,setDate]=useState()
    const auth=useAuth()
    useEffect(()=>{
    if(myCourse.length!=0){
     myCourse.courseInfo.map(c=>{
       if(c.course==course._id){
      
         setDate(c.certDate.slice(0,10))
     
      
       }
     })
    }
    

    },[])


 

      return(
        <></>
      )
}