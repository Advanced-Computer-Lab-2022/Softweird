// const request = require('request')
// _External_URL = 'https://api.exchangerate.host/latest'
// const axios = require('axios')
// const Courses = require('../Modules/Course')
// const countryToCurrency =require('country-to-currency')
// const countryCurrency =  async (req,res ) => {
//     const {country} = req.body 
//     const curr = countryToCurrency [country]
//     let cancel
//     var r
//        axios.get(_External_URL ,{
//            cancelToken: new axios.CancelToken(c => cancel=c)
//        }).then(async function(response) {
//        const {rates}=response.data
//        console.log(rates);
       
//        for (let element in rates){
//            if (element === curr)
//            {
//                 r = rates[element]
               
//            }
           
//        }
       
//        res.status(200).send([r,curr])
//    });
   
 
// }

// module.exports={countryCurrency}

const request = require('request')
_External_URL = 'https://api.exchangerate.host/latest'
const axios = require('axios')
const Courses = require('../Modules/Course')
const countryToCurrency =require('country-to-currency')
const countryCurrency =  async (req,res ) => {
    const {country} = req.query
  
    var curr = countryToCurrency [country]
    if(curr == undefined) curr = "EUR"
   // console.log( "//////////////////////" + curr)
    let cancel
    var rate =1
       axios.get(_External_URL ,{
           cancelToken: new axios.CancelToken(c => cancel=c)
       }).then(async function(response) {
       const {rates}=response.data
      
       for (let element in rates){
           if (element === curr)
           {
                rate = rates[element].toFixed(2)
                break;
               
           }
           
       }

       console.log(curr)
       res.status(200).send({rate,curr})
   });
   
 
}

module.exports={countryCurrency}