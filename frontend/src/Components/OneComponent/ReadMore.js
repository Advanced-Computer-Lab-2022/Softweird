
import { Typography } from '@mui/material';
import {useState} from 'react'
const ReadMore = ({ children }) => {
 
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text"  style={{overflowWrap:" break-word",paddingLeft:"2rem",paddingTop:"1rem"}}>
      {isReadMore ? 
      
      <Typography><b style={{marginRight:"0.3rem"}}>problem:  </b>  {text.slice(0, 195)}</Typography> :
      <Typography><b style={{marginRight:"0.3rem"}}>problem:  </b>  {text}</Typography>}
  
    {text.length>195 &&  <Typography onClick={toggleReadMore} className="read-or-hide"
       sx={{color:"#c50d0d" , fontWeight:"bold",
       "&:hover":{color:"grey",cursor:"pointer"}}}>
        {isReadMore ? "...read more" : " show less"}
      </Typography>}
    </p>
  );
};
  export default ReadMore