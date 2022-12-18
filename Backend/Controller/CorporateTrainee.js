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
    const {courseTitle} = req.query
    if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error})
   }
   
    var userid = mongoose.Types.ObjectId(id)
    try{
   const course =await Course.findOne({title:courseTitle})
   console.log(course._id)
   const MyCourse =await corporate.findOne({user:userid,courseInfo:{$elemMatch:{course:course._id}}}).populate('courseInfo.course');
   res.status(200).send(MyCourse)
    }
    catch(e){res.status(404).json(e)}
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
   
     try{
     if(c==null){
         
         const course = {course:courseTitle , subtitlesWatched:[{
             title:subtitleTitle,
             video : [videoText]
         }]}
         
         coursenew= await individual.findOneAndUpdate({user : userID},{$push:{videoWatched:course}},{returnOriginal: false})
      
         }
    else{
        var s =await individual.findOne({user : userID , videoWatched:{$elemMatch:{course:courseTitle}} ,
            videoWatched:{$elemMatch:{subtitlesWatched:{$elemMatch:{title:subtitleTitle}}}}},{returnOriginal: false})
        

        if(s===null){
            const sub = {
                title:subtitleTitle,
                video : [videoText]
            }
            
            coursenew=await individual.findOneAndUpdate({user:userID ,videoWatched:{$elemMatch:{course:courseTitle}}},{
                $push:{"videoWatched.$.subtitlesWatched":sub}},{returnOriginal: false})
        }
        var subtitle 
         s.videoWatched.forEach(v=>{
            if(v.course==courseTitle){subtitle=v.subtitlesWatched}
        })
        
        var neededSub = subtitle.map(s=>{
            if (s.title==subtitleTitle){
                s.video.push(videoText)
            }
        })
      
        console.log(subtitle)
        coursenew= await individual.findOneAndUpdate({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}},
            {$set:{'videoWatched.$.subtitlesWatched':subtitle}},{returnOriginal: false})
     }
     
     res.status(200).json(coursenew)
    }
    catch(error){
        res.status(404).json(error)
    }
 }

 const RegisterCourse = async (req,res) =>{
    const {courseTitle} = req.body;
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error:"error"})
}
try{
      var userID = mongoose.Types.ObjectId(id)

    const c = await Course.findOne({title:courseTitle})
    if(c==null){
        res.status(404).json({error:"no such course"})
    }
    const courses = {course:c._id};
    const ind = await individual.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
    res.status(200).json(ind);
   }
   catch(error){res.status(404).json(error)};
}

    
    
    
module.exports = {
    RateCourse, MyCourse, AllCourses, RegisterCourse, VideoWatched
}