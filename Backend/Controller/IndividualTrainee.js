const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Users = require('../Modules/Users')
const individual = require('../Modules/IndividualTrainee')
const Instructor = require ('../Modules/Instructor')

const RateCourse = async(req,res)=>{
     const {subtitleNumber,courseId,rating} = req.body
     const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    if(!mongoose.Types.ObjectId.isValid(courseId)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
     var courseID = mongoose.Types.ObjectId(courseId)
     const indv = await individual.findOne({user:userid})
     const courses = indv.courseInfo
     var i = 0;
     var sumRate=0
     var num = 0;
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
    await individual.findOneAndUpdate(({user:userid}),{$set:{courseInfo :courses }})
     course = await Course.findById(courseId)
    var rateCourse=0
    if(i==1){
        rateCourse = course.rating - rateOld + rateNew 
    }
    else rateCourse = course.rating + rateNew 

    await Course.findByIdAndUpdate(courseId,{$set:{rating:rateCourse , numberRating:course.numberRating+i}})

 }

 const AllCourses = async (req,res)=>{
     const {id}=req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
     try{
    const AllCourses =await Course.find({})
    const MyCourse =await individual.findOne({user:userid}).select(courseInfo)
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
    
     var courseID = mongoose.Types.ObjectId(courseId)
    const AllCourses =await Course.find({courseID})
    const MyCourse =await individual.findOne({user:userid})
    res.status(200).send({AllCourses,MyCourse})
 }

 const RateInstructor = async (req,res) =>{
     const {rate} = req.body
     const {courseId} =req.params
      if(!mongoose.Types.ObjectId.isValid(courseId)){
             return res.status(404).json(error)
    }
    
     var courseID = mongoose.Types.ObjectId(courseId)
     try{
         const instructorid = await Course.findById(courseID).select(instructor_id)
         const instructor = await Instructor.findOne({user:instructorid})
         const rating = instructor.rating.rate
         const number = instructor.rating.numberPeople
         const newNumber = number+1
         const newRate = {
             rate: (rating+rate)/newNumber,
             numberPeople : newNumber
             }

         await Instructor.findOneAndUpdate({user:instructorid},{$set:{rating:newRate}})
         res.status(200).json({succes:"tamam"})
     }
     catch(error){
         res.status(404).json(error)
     }


 }

 const VideoWatched = async (req,res) =>{
    const {subtitleTitle,videoText,courseTitle}=req.body
    const {id} =req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"error"})
    }
     var userID = mongoose.Types.ObjectId(id)
     var c = await individual.findOne({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}})
     let coursenew
     console.log(c==null)
     try{
     if(c==null){
         
         const course = {course:courseTitle , subtitlesWatched:{
             title:subtitleTitle,
             video : [videoText]
         }}
         
         coursenew= await individual.findOneAndUpdate({user : userID},{$push:{videoWatched:course}},{returnOriginal: false})
      
         }
    else{
        var s =await individual.findOne({user : userID , videoWatched:{$elemMatch:{course:courseTitle}},
            videoWatched:{$elemMatch:{subtitlesWatched:{$elemMatch:{title:subtitleTitle}}}}},{returnOriginal: false})
            console.log(s)

        if(s===null){
            const sub = {
                title:subtitleTitle,
                video : [videoText]
            }
            
            coursenew=await individual.findOneAndUpdate({user:userID ,videoWatched:{$elemMatch:{course:courseTitle}}},{
                $push:{"videoWatched.$.subtitlesWatched":sub}},{returnOriginal: false})
        }
        coursenew= await individual.findOneAndUpdate({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}},
            {$push:{'videoWatched.$[elem].subtitlesWatched.video':videoText},
             arrayFilters: [ { "elem.title": { $eq: subtitleTitle} } ]},{returnOriginal: false})
     }
     res.status(200).json(coursenew)
    }
    catch(error){
        res.status(404).json(error)
    }
 }
    
    
module.exports = {
    RateCourse, AllCourses, RateInstructor, MyCourse ,VideoWatched
}