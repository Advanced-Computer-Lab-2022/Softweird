
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useAuth } from "../auth";
import Loading from "./Loading";
import axios from 'axios'
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MDQkkIA8cI2NDmdmUHpV8sC6avDoFqbwWBZnS5RP7dIEz4o0rgZQh0E9t087GWsqajIrJs9Y4PjMdbVelKBaIZi00jsrsfCXu");

export default function Pay({course,setPaying,setOpenPay}) {
  console.log(course)
  const [clientSecret, setClientSecret] = useState("");
  const auth = useAuth()
const[loading,setLoading] =useState(true)
  useEffect(() => {
    let cancel
    setLoading(true)
         axios({
             method:"POST",
             url : `/Individual/paymentIntent/`,
             data:{courseTitle: course.title},
             cancelToken: new axios.CancelToken (c => cancel = c)

         }).then (res => {
          setLoading(false)
          setClientSecret(res.data.clientSecret)
          console.log(res.data.clientSecret)

         }).
         catch(e=>{
             if(axios.isCancel(e)) return 
         });
         return () => cancel ()
  }, []);

  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#bbd2b1',
    },
    labels: 'floating',
    rules: {
    
      '.Input':{
        marginBottom:"1rem",
        padding: "0.5rem",
        paddingLeft:"1.5rem",
        fontSize:"0.9rem"
      },
      ".Label":{
        paddingBottom:"0.5rem",
        color:"black",
        fontSize:"0.5rem !important",
        paddingLeft:"0.5rem"
       
      },
      ".Autofill":{
        display:"none"
      },
      ".Label:first-child":{
        color:"red"

      }
     
    
      
    
    
  },
  };
  const options = {
    clientSecret,
    appearance,
  };
  

  return (

    <div className="App">
      {loading && <Loading />}
      {clientSecret && !loading && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm course={course} setPaying={setPaying} setOpenPay={setOpenPay}/>
        </Elements>
      )}
    </div>
  );
}
