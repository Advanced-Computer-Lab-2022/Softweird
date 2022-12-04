const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Users = require('../Modules/Users')
const corporate = require('../Modules/CorporateTrainee')
const company=require('../Modules/Company')

const RateCourse = async(req,res)=>{
     const {subtitleNumber,courseId,rating} = req.body
     const {id} = req.params
       if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
     try{
     const corp = await corporate.findOne({user:userid})
     const courses = corp.courseInfo
     var i = 0;
     var sumRate=0
     var num = 0;
       if(!mongoose.Types.ObjectId.isValid(courseId)){
             return res.status(404).json({error})
    }
     var courseID = mongoose.Types.ObjectId(courseId)
     courses.map(element => {
        
         if(element.course == courseID){
             if(element.rating.find(e => e>-1)!=undefined){
                 i=1;
             }
             var oldRate = element.rate[subtitleNumber-1]
             element.rate[subtitleNumber-1] = rating
             element.rate.forEach(e => {
                 if(e>-1)
                 {num++ 
                 sumRate+=e
                 }

                 
             });
         }
         
     });
     var sumOld = 0
     var numOld = 0
     if(oldRate!=-1) {sumOld = sumRate-rate+oldRate 
     numOld=num
     }
     else {
         sumOld = sumRate-rate
         numOld=num-1
     }
     var rateNew = sumRate/num
     var rateOld = sumOld/numOld
    await corporate.findOneAndUpdate(({user:userid}),{$set:{courseInfo :courses }})
     course = await Course.findById(courseId)
    var rateCourse=0
    if(i==1){
        rateCourse = course.rating - rateOld + rateNew 
    }
    else rateCourse = course.rating + rateNew 

    await Course.findByIdAndUpdate(courseId,{$set:{rating:rateCourse , numberRating:course.numberRating+i}})
    res.status(200).json({success:"tammam"})
     }
     catch(error){
         res.status(404).json(error)
     }
 }

 const AllCourses = async (req,res)=>{
     const {id}=req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
     var userid = mongoose.Types.ObjectId(id)
     try{
    const AllCourses =await company.find({}).populate('courses')
    const MyCourse =await corporate.findOne({user:userid})
    res.status(200).send({AllCourses,MyCourse})
     }
     catch(error){
         res.status(404).json(error)
     }
 }

  const MyCourse = async (req,res)=>{
     const {id}=req.params
     const {courseId} = req.query
     if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
      if(!mongoose.Types.ObjectId.isValid(courseId)){
             return res.status(404).json({error})
    }
    try{
     var courseID = mongoose.Types.ObjectId(courseId)
    const MyCourse =await corporate.findOne({user:userid,course:courseID}).populate('course')
    res.status(200).send({AllCourses,MyCourse})
    }
    catch(error){
        res.status(404).json(error)
    }
 }
    
    
    
module.exports = {
    RateCourse, MyCourse, AllCourses
}