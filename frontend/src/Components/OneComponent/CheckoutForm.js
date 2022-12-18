import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import './Checkout.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import { Divider, Stack,Button } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import Coding from '../../Images/Coding.jpg'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {TbFileCertificate} from 'react-icons/tb'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { IconContext } from "react-icons";
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import {Currency} from '../../Context/Currency'
import {useContext} from 'react'
import { useAuth } from "../auth";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function CheckoutForm({course,setPaying,setOpenPay}) {
  const stripe = useStripe();
  const elements = useElements();
const auth = useAuth()
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {curr , setCurr,rate,setRate} = useContext(Currency)
  const navigate = useNavigate()

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
console.log(course)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaying(false)

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    let cancel
         axios({
             method:"POST",
             url : `/Individual/payForCourse/`,
             data:{courseTitle: course.title , id:auth.user.id},
             cancelToken: new axios.CancelToken (c => cancel = c)

         }).then (res => {
             

         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         setOpenPay(false)
         navigate(`/MyCourses/${course.title}`)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/MyCourses/${course.title}`,
      },
    });


    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };


  const paymentElementOptions = {
    layout: "tabs",
    
    
  }

  


  return (
    
    <Box sx={{position:"relative"}}>
    <div className="wire"></div>
    
    
    <Card className="card-course " sx={{position:"relative",left:"0",right:"0",p:"2rem",mb:"6rem",height:"42rem"}}>
    <Stack direction="row" gap={5} marginTop={"2rem"} >
    <Card   sx={{maxWidth:"45%", flex:1.2,height:"fit-content"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{height:"50%"}}
        image={Coding}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:"2%"}}>
          {course.title}
        </Typography>
        <Divider sx={{borderColor: "rgba(0, 0, 0, 0.40)"}}/>
        <Box sx={{    paddingTop: "2rem",
    color: "grey",
    fontSize:" 0.9rem",}}>
        <Typography gutterBottom variant="p" component="div">
          <HourglassTopIcon sx={{color:"#bbd2b1"}}/> {course.totalHours} hours to complete
        </Typography>
        <Typography gutterBottom variant="p" component="div">
        <IconContext.Provider value={{ color: "#bbd2b1" }}>
        
          <TbFileCertificate style={{color:"#bbd2b1",fontWeight:"bold",fontSize:"1.3rem",marginRight:"2%"}}/>
          </IconContext.Provider>
               Certified
        </Typography>
        <Typography gutterBottom variant="p" component="div">
         <AttachMoneyIcon sx={{color:"#bbd2b1"}}/> Begin your learning path with only <Typography style={{fontWeight:"bold",
   textAlign:"center",
    fontWeight: "bold",
    color: "#c50d0d",
    fontSize: "1.2rem"}}> {course.price*rate} €
    </Typography>
        </Typography>
        </Box>
      </CardContent>
   
    </Card>
    <Box flex={1.8} >
    <form id="payment-form" onSubmit={handleSubmit} style={{flex:2,width:"75%",position:"relative",right:"-20%"}}>
  
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      
      {/* <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button> */}
      {/* < Button disabled={isLoading || !stripe || !elements} id="submit">
      <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button> */}
      <div className="text-end">
      <Button disabled={isLoading || !stripe || !elements} id="submit"
       variant="contained" sx={{backgroundColor:"#bbd2b1" ,fontWeight:"bold",ml:"0.8rem",
                boxShadow:"none", textDecoration:"none", position:"absolute" ,right:0 ,mt:"7%",
                "&:hover":{
                    cursor: "pointer",
                    color:"#bbd2b1",
                    backgroundColor:"#fff"

                    }}}
                    onClick={handleSubmit}><span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                  </span></Button>
                  </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </Box>
      
      </Stack>
      </Card>
      
      </Box>

  

  );
}