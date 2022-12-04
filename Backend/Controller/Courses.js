const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Instructor = require('../Modules/Instructor')
const Users = require('../Modules/Users')
const countryToCurrency =require('country-to-currency')
const request = require('request')
const _External_URL = 'https://api.exchangerate.host/latest'
const axios = require('axios')
const individual = require('../Modules/IndividualTrainee')

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
    const {id} = req.params
    console.log("hhh")
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such course'})
    }
    const course = await Course.findById(id)
    if(!course){
        return res.status(404).json({error:'no such course'})
    }
    const instructor =await getInstructor(course.instructor_id)
    console.log(instructor);
    console.log(course);
    return res.status(200).json({course, instructor})
}

    
    
module.exports = {
    getCourses , getOneCourse 
}