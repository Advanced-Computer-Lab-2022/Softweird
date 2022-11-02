const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const countryToCurrency =require('country-to-currency')
const request = require('request')
const _External_URL = 'https://api.exchangerate.host/latest'
const axios = require('axios')

var r

const getCourses =  async (req,res) => {
    const course = await Course.find()
    res.status(200).json(course)
    
    
}
const getInstructor =  async(id) => {
    if(id!==undefined){
        const instructor = await Instructor.find({user:mongoose.Types.ObjectId(id)}).populate('user')
        return instructor
    }
}

const getOneCourse = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such course'})
    }
    const course = await Course.findById(id)
    if(!course){
        return res.status(404).json({error:'no such course'})
    }
    const instructor = getInstructor(course.instructor_id)
    return res.status(200).json({course, instructor})

}

const addOneCourse = (req,res) => {
    const {title , subtitle , price , summary } = req.body
    
}
// const currencyRate = (req ,res) => {
//     apiRequest.callApi(function(response){
//         const {rates} = response
//         res.json({rates})
        
//     })

// }
 
    // const currencyRate = (callBack, curr) => {
    //     request(_External_URL ,{json:true}, async (res,err,body)=>{
    //         if(err) return (err)   
    //         const{rates}=body 
    //         console.log(body)
    //         for (let element in rates){
    //             if (element === curr)
    //             {
    //                 r = rates[element]
                    
    //             }
            
    //         }
            
    //          await Course.updateMany( { },
    //           {  $set:{
    //                 price : r
    //             }}
    //          ) 
  
    //          res.status(200).send(r)
             
    
    // });
    // }


    
    
    
module.exports = {
    getCourses , getOneCourse , addOneCourse 
}