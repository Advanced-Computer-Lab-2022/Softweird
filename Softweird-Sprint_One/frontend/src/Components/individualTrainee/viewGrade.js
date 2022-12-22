import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"

import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import ProgressBar from 'react-bootstrap/ProgressBar';


const Solve = () => {
    const [grade,setGrade] =useState('')
    
    
    useEffect(() =>{
        let cancel
         axios({
        method:"GET",
        url : "IndividualTrainee/grade",
        params : {Subtitle:"titl43",id :"6384e316b82023e53230ade0" , Uid :"6387cd0c3420cccd5c92f4c0"  },
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setGrade(res.data.p)
       
        console.log(grade + "///////totototo////")
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
    }, [])
    
    const now = grade;
    console.log(grade + "///////totototo////")
    console.log(grade + "///////totototo////")
  return (
    <><div>
         
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          your grade is

          <ProgressBar now={now} label={`${now}%`} />
      </div><div class="text-end">
              <br />
              <Button variant="primary" onClick={() => window.location.href=`/ModelAnswer`} >back home </Button>{'   '}

          </div></>
  )
}


export default Solve;