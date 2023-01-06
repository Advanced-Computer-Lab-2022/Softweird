import { Button } from "@mui/material"
import { OneCourseResult } from '../../Context/OneCourseResult';
import {  useContext ,useState} from 'react';

function ApplyDiscount ({discount}) {
    const {openDisc,setOpenDisc} = useContext(OneCourseResult)
    return(
        <Button variant="contained" href="#contained-buttons" sx={{backgroundColor:"#bbd2b1",fontWeight:"bolder",
        '&: hover':{ cursor: "pointer",
        color:"#bbd2b1",
        backgroundColor:"#fff"}}}
        onClick={()=>{setOpenDisc(true)}}
         >{discount}</Button>
    )
}
export default ApplyDiscount