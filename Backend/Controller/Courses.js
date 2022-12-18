const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Instructor = require('../Modules/Instructor')
const Users = require('../Modules/Users')
const countryToCurrency =require('country-to-currency')
const request = require('request')
const _External_URL = 'https://api.exchangerate.host/latest'
const axios = require('axios')
const individual = require('../Modules/IndividualTrainee')
const corporate  = require('../Modules/CorporateTrainee')

var r

const getCourses =  async (req,res) => {
    const course = await Course.find()
    res.status(200).json(course)
    
    
}
const getInstructor =  async(id) => {
    if(id!==undefined){
        const instructor = await Instructor.find({user:mongoose.Types.ObjectId(id)}).populate('user')
        console.log(instructor)
        return instructor
    }
}

const getOneCourse = async (req,res) =>{
    const {id} = req.params;
    const{userId,type} =req.query

    const course = await Course.findOne({title:id})
    if(!course){
        return res.status(200).json({error:'no such course'})
    }
    var myCourse = null
    if(type == "individual"){
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(404).json({error})
   }
   
    var userid = mongoose.Types.ObjectId(userId)
    
         myCourse = await individual.findOne({user:userid})

    }
    if(type == "corporate"){
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(404).json({error})
   }
   
    var userid = mongoose.Types.ObjectId(userId)
         myCourse = await corporate.findOne({user:userid}).populate("company")

    }
    
    const instructor =await getInstructor(course.instructor_id)
    
    return res.status(200).json({course, instructor,myCourse})
}

const getMostViewed = async(req,res) =>{
    try {
        if (input==='' ){
            
                return res.status(200).send([])
            }
        
        else{
                const course = await Course.find({}).sort({enrolledStudents :'desc'})
                const arr = course.slice(0,10)
                return res.status(200).send(arr)
        }
        
    }
        
        catch (error){
            res.status(404).send(error)
        }
}

    
    
module.exports = {
    getCourses , getOneCourse , getMostViewed
}