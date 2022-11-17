const request = require('request')
_External_URL = 'https://api.exchangerate.host/latest'
const axios = require('axios')
const Courses = require('../Modules/Course')
const countryToCurrency =require('country-to-currency')
const countryCurrency =  async (req,res ) => {
    const {country , username} = req.body 
    const curr = countryToCurrency [country]
    let cancel
       axios.get(_External_UR ,{
           cancelToken: new axios.cancelToken(c => cancel=c)
       }).then(async function(response) {
       const {rates}=response.data
       console.log(rates);
       
       for (let element in rates){
           if (element === curr)
           {
                r = rates[element]
               
           }
           
       }
       
       res.status(200).send([r,curr])
   });
   
 
}

module.exports={countryCurrency}