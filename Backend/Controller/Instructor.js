const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const User = require('../Modules/Users')
const Instructor = require ('../Modules/Instructor')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { getVideoDurationInSeconds } = require('get-video-duration');




// get instructor course + search instructor
const getInstructorCourses =  async (req,res) => {
    console.log("ff")
    const {value} = req.query
    const {instructor} = req.query  //Get id from instructor frontend
    if(instructor==undefined){
        return res.status(404).json({error:'404'})
    }
     if(!mongoose.Types.ObjectId.isValid(instructor)){
        return res.status(404).json({error:'no such instructor'})
    }
    var inst = mongoose.Types.ObjectId(instructor)
    let course 
    if(value === ""){
         course = await Course.find({instructor_id: inst }).sort({enrolledStudents :-1}) //instructor = id
    }
    else{
         course = await Course.find({$and:[{$or:[{title :  { $regex: value ,$options: 'i' }},
        {subject :  { $regex: value,$options: 'i' }}]},
        {instructor_id: inst }]}).sort({enrolledStudents :-1}) //instructor = id
    }


    if(!course){
        return res.status(404).json({error:'no Courses found!'})
    }

    return res.status(200).json(course)

}

const getOneCourse =  async (req,res) => {
    const {courseTitle} = req.query
    const {id} = req.params 
     //Get id from instructor frontend
    if(id==undefined){
        return res.status(404).json({error:'404'})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such instructor'})
    }
    var inst = mongoose.Types.ObjectId(id)
   

     
    course = await Course.findOne({instructor_id: inst,title:courseTitle}) //instructor = id

    return res.status(200).json(course)

}

const addOneCourse = async (req,res) => {
    const {Title , Subtitle ,Subject , Price , Summary } = req.body
    const coursee = await Course.find({title : Title})
    console.log(req.body)
    //console.log(coursee)
    if (coursee.length){
        console.log(coursee.length)
        return res.status(404).json({error:'Course already exists'})
    }
    const {id} =req.params
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such instructor'})
    }
    var inst = mongoose.Types.ObjectId(id)
   
    const name = await User.findById(inst)
    await Course.create({instructor: name.fName+" "+ name.lName, instructor_id: inst ,title: Title,subject:Subject , price: Price, summary: Summary})
   
    return res.status(201).json("Sucess")
}

const getMyProfile = async (req,res)=>{
    const {id} = req.params;
    try {
         if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
        var inst = mongoose.Types.ObjectId(id)
         const instructor = await Instructor.findOne({user:inst}).populate('user');
         res.status(200).json(instructor);

    }
    catch(error){
        res.status(404).json(error);

    }
}

const UpdateBiography = async (req,res) =>{
    const {biography , email} = req.body;
    const {id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json(error)
    }
         var inst = mongoose.Types.ObjectId(id)
         var userold = await User.findById(inst);
        const Oldemail = userold.email
        const instructor = await Instructor.findOneAndUpdate({user:inst},{$set:{biography:biography}},{returnOriginal: false});
        if (instructor==null || userold==null){
            res.status(404).json({error:"no such user"})
        }
        
    res.status(200).json(instructor)
    }
    catch(error){ res.status(404).json(error)}
}


const addVideo = async (req,res)=>{
    const {subtitleTitle,courseTitle,videoLink,videoDescription,videoLength,preview} = req.body
    console.log(subtitleTitle)
    try{
        const course = await Course.findOne({title:courseTitle})
       
        var subtitles = course.subtitles 
        
        const hours = course.totalHours
        if(!preview){
        const videoNew = {link:videoLink,text:videoDescription,length:videoLength}
      
       await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$push:{"subtitles.$.video":videoNew},$inc:{"subtitles.$.totalHours":videoLength} ,$set :{totalHours:hours+videoLength}},{returnOriginal: false})
       const courseNew = await Course.find()
        res.status(200).json(courseNew)
        }
        else{
            const videoNew = {link:videoLink,text:videoDescription,length:videoLength,preview:true}
      
       const courseNew = await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$push:{"subtitles.$.video":videoNew},$inc:{"subtitles.$.totalHours":videoLength} ,$set :{totalHours:hours+videoLength}},{returnOriginal: false})
      
        res.status(200).json(courseNew)
        }
    }
    catch(error){
        res.status(404).json(error)
    }
   
    
   
} 
const addSubtitle = async (req,res)=>{
    const {subtitleTitle,courseTitle} = req.body
    try{
        
        const subtitle ={title:subtitleTitle}
        const courseNew =await Course.findOneAndUpdate(({title:courseTitle}),{$push:{subtitles:subtitle}},{returnOriginal: false})
        console.log(courseNew)
        res.status(200).json(courseNew)
        
        }
        catch(error){
            res.status(404).json(error)
        }
}  
const deleteSubtitle = async (req,res)=>{
    try{
        const {subtitleTitle,courseTitle} = req.body

         const courses = await Course.findOne({title:courseTitle})
         var subtitles = courses.subtitles
        var totalHoursSubtitle = subtitles.totalHours
         var courseHours = courses.totalHours
       const courseNew =  await Course.findOneAndUpdate(({title:courseTitle}),{$pull:{subtitles:{title: subtitleTitle}},$set:{ totalHours:courseHours-totalHoursSubtitle}},{returnOriginal: false})
         
        res.status(200).json(courseNew)
    }
    catch(error){res.status(404).json(error)}
    
} 
const deleteVideo = async (req,res) =>{

    const {subtitleTitle,videoText,courseTitle,videoLength,type}=req.body
    try{
        const courses = await Course.findOne({title:courseTitle})
        var courseHours = courses.totalHours
       const courseNew  = await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$pull:{"subtitles.$.video":{text:videoText}},$inc:{"subtitles.$.totalHours":-1*videoLength},$set:{totalHours:courseHours-videoLength}},{returnOriginal: false})
       
        res.status(200).json(courseNew)
    }
    catch(error){
        res.status(404).json(error)
    }
} 

const FinishCourse = async (req,res) =>{
    const {courseTitle} =req.body
    try{
        const courseNew = await Course.findOneAndUpdate({title:courseTitle},({$set:{Finished:true}}),{returnOriginal: false})
        res.status(200).json(courseNew)
    }
    catch(e){
        res.status(404).json(error)
    }
}



module.exports = {
    getInstructorCourses,addOneCourse,getMyProfile,UpdateBiography, addVideo, 
     deleteVideo, deleteSubtitle, addSubtitle , getOneCourse ,FinishCourse
}    