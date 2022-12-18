const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Users = require('../Modules/Users')
const individual = require('../Modules/IndividualTrainee')
const Instructor = require ('../Modules/Instructor')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const express = require('express');
const app = express();

const RateCourse = async(req,res)=>{
     const {courseTitle,rating} = req.body
     const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
     try{
        
         const c = await Course.findOne({title:courseTitle})
         const i =await individual.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:c._id}}},
            {$set:{'courseInfo.$.rating':true}},{returnOriginal:false})
         const rate =parseFloat(c.rating)+parseInt(rating)
        const cnew = await Course.findOneAndUpdate({title:courseTitle},{$set:{rating:rate},$inc:{numberRating:1}},
            {returnOriginal:false})
        res.status(200).json(i)
     }
     catch(error){
         res.status(404).json(error)
     }
    //  var courseID = mongoose.Types.ObjectId(courseId)
    //  const indv = await individual.findOne({user:userid})
    //  const courses = indv.courseInfo
    //  var i = 0;
    //  var sumRate=0
    //  var num = 0;
    //  courses.map(element => {
    //      if(element.course == courseID){
    //          if(element.rating.find(e => e>-1)!=undefined){
    //              i=1;
    //          }
    //          var oldRate = element.rate[subtitleNumber-1]
    //          element.rate[subtitleNumber-1] = rating
    //          element.rate.forEach(e => {
    //              if(e>-1)
    //              {num++ 
    //              sumRate+=e
    //              }

                 
    //          });
    //      }
         
    //  });
    //  var sumOld = 0
    //  var numOld = 0
    //  if(oldRate!=-1) {sumOld = sumRate-rate+oldRate 
    //  numOld=num
    //  }
    //  else {
    //      sumOld = sumRate-rate
    //      numOld=num-1
    //  }
    //  var rateNew = sumRate/num
    //  var rateOld = sumOld/numOld
    // await individual.findOneAndUpdate(({user:userid}),{$set:{courseInfo :courses }})
    //  course = await Course.findById(courseId)
    // var rateCourse=0
    // if(i==1){
    //     rateCourse = course.rating - rateOld + rateNew 
    // }
    // else rateCourse = course.rating + rateNew 

    // await Course.findByIdAndUpdate(courseId,{$set:{rating:rateCourse , numberRating:course.numberRating+i}})

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
 //to get videos


  const MyCourse = async (req,res)=>{
     const {id}=req.params
     const {courseTitle} = req.query
     if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
     try{
    const course =await Course.findOne({title:courseTitle})
     if(course == null) 
     {res.status(200).json({error:"no course"});
      return;
    };
const s = await individual.findOne({user:userid})
    await individual.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:course._id}}},{$set:{"courseInfo.$.firstOpen":false}},{returnOriginal:true})
    var firstOpen = false;
    s.courseInfo.forEach(c=>{
      
        if (c.course.equals(course._id) && c.firstOpen === true)
             firstOpen=true
     } )
console.log(firstOpen)
  
     const myCourse =await individual.findOne({user:userid,courseInfo:{$elemMatch:{course:course._id}}});
    res.status(200).send({myCourse,course,firstOpen});
     }
     catch(e){res.status(404).json(e)}
 }

 const RateInstructor = async (req,res) =>{
     const {rate,courseId} = req.body
     const {userId} =req.params
    
      if(!mongoose.Types.ObjectId.isValid(courseId)){
             return res.status(404).json(error)
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json(error)
}

    
     var courseID = mongoose.Types.ObjectId(courseId)
     var userID = mongoose.Types.ObjectId(userId)
   
     try{
         const course = await Course.findById(courseID)
         const instructor = await Instructor.findOne({user:course.instructor_id})
         const rating = instructor.rating.rate
         const number = instructor.rating.numberPeople
         const newNumber = number+1
         const newRate = {
             rate: (parseFloat(rating)+parseInt(rate)),
             numberPeople : newNumber
             }

         await Instructor.findOneAndUpdate({user:course.instructor_id},{$set:{rating:newRate}})
        const i =  await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseID}}},
            {$set:{'courseInfo.$.rateInst':true}},{returnOriginal:false})
         res.status(200).json(i)
     }
     catch(error){
         res.status(404).json(error)
     }


 }
//update watched videos
 const VideoWatched = async (req,res) =>{
    const {subtitleTitle,videoText,courseTitle}=req.body
    console.log(subtitleTitle,videoText,courseTitle)
    const {id} =req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"error"})
    }
    const courseCon = await Course.findOne({title:courseTitle})
    var count
     var userID = mongoose.Types.ObjectId(id)
     var c = await individual.findOne({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}})
     var u = await individual.findOne({user:userID})
     let coursenew
 
     var progOld
     u.courseInfo.forEach(p=>{
         if(p.course==courseCon._id){
             progOld = p.percentage.progress;
           
         }
     })
     
     
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
            if (s.title==subtitleTitle ){
                if (!s.video.includes(videoText)){
                s.video.push(videoText)}
            titlesWatched=s.video.length
            }
        })
      
        
        coursenew= await individual.findOneAndUpdate({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}},
            {$set:{'videoWatched.$.subtitlesWatched':subtitle}},{returnOriginal: false})
     }
     const progNew = progOld+=1
     const indvFianl = await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseCon._id}}},{$set:{"courseInfo.$.percentage.progress":progNew}})
  
     res.status(200).json(coursenew)
    }
    catch(error){
        res.status(404).json(error)
    }
 }

//register course
 const RegisterCourse = async (req,res) =>{
     const {courseTitle} = req.body;
     const {id} = req.params;
   
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
try{
       var userID = mongoose.Types.ObjectId(id)

     const c = await Course.findOne({title:courseTitle,firstOpen:true})
     if(c==null){
         res.status(404).json({error:"no such course"})
     }
     var count=0
     c.subtitles.forEach(s=>{
         count+=1
        s.video.forEach(v=>{
            count+=1;
        })
    })
     const courses = {course:c._id,percentage:{progress:0,total:count}};
     const ind = await individual.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
     await Course.findOneAndUpdate({title:courseTitle},{$inc:{enrolledStudents:1}})
     res.status(200).json(ind);
    }
    catch(error){res.status(404).json(error)};
 }

    

 const Notes = async (req,res) =>{
    const {notes,courseTitle,videoText}=req.body
    const {id} =req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"error"})
    }
     var userID = mongoose.Types.ObjectId(id)
     var c = await individual.findOne({user:userID,notes:{$elemMatch:{course:courseTitle}}})
     let coursenew
   
     try{
     if(c==null){
         
         const course = {course:courseTitle , subtitleNotes:[{
            videoTitle:videoText,
             notes : notes
         }]}
         
         coursenew= await individual.findOneAndUpdate({user : userID},{$push:{notes:course}},{returnOriginal: false})
      
         }
    else{
        var s =await individual.findOne({user : userID , notes:{$elemMatch:{course:courseTitle}} ,
            notes:{$elemMatch:{subtitleNotes:{$elemMatch:{videoTitle:videoText}}}}},{returnOriginal: false})
        

        if(s===null){
            const sub = {
                videoTitle:videoText,
                notes : notes
            }
            
            coursenew=await individual.findOneAndUpdate({user:userID ,notes:{$elemMatch:{course:courseTitle}}},{
                $push:{"notes.$.subtitleNotes":sub}},{returnOriginal: false})
        }
        else {
         var note 
         s.notes.forEach(v=>{
            if(v.course==courseTitle){note=v.subtitleNotes}
        })
        
        var neededSub = note.map((s,i)=>{
            if (s.videoTitle==videoText ){
                s.notes=notes

            }
        })
      
        
        coursenew= await individual.findOneAndUpdate({user:userID,notes:{$elemMatch:{course:courseTitle}}},
            {$set:{'notes.$.subtitleNotes':note}},{returnOriginal: false})
     }
    }
     
     res.status(200).json(coursenew)
    }
    catch(error){
        res.status(404).json(error)
    }
 }


 const getQusetions =  async(req,res) => {
    const  {Subtitle ,courseId } = req.query
  
  const ques =  await Course.find({_id:courseId},{subtitles: {$elemMatch: {title : Subtitle }}})
  
  var r = ques[0].subtitles[0].exercise
       res.status(200).send({r})
  }

  

   const solve = async(req,res) => {
    const  {Answers ,id,Subtitle ,courseId  } = req.query
    console.log(Subtitle,id)
   console.log()
  //  const {id} = req.params
   const userId = mongoose.Types.ObjectId(id)
   const cId = mongoose.Types.ObjectId(courseId)
     const model = await Course.findOne( {_id:cId},{subtitles: {$elemMatch: {title : Subtitle }}})
     const u = await individual.findOne({user:userId})
     var progOld
    //  u.courseInfo.forEach(p=>{
    //      if(p.course==courseCon._id){
    //          progOld = p.percentage.progress;
           
    //      }
    //  })
//      console.log(model,"dd")
    var g =0;
   for (i= 0 ; i<Answers.length ; i++ )
    {
        console.log(Answers)
        console.log(model.subtitles[0].exercise[i].answer)
      if (model.subtitles[0].exercise[i])
      {
      if (Answers[i]=== model.subtitles[0].exercise[i].answer)
      {
           g = g+1;
         
      }
    }
}
const old =  await individual.findOne({ user:userId,exercises:{$elemMatch:{course:cId,subtitle:Subtitle}}})
var p = (g/(model.subtitles[0].exercise.length)) * 100
const exercise = {course:cId,subtitle:Subtitle,answers:Answers,grade:p }

 const user =  await individual.findOneAndUpdate({ user:userId } ,{$push:{exercises:exercise} },{returnOriginal:false})

// else{
//     const user =  await individual.findOneAndUpdate({ user:userId,exercises:{$elemMatch:{course:{cId},subtitle:{Subtitle}}} } ,{$set:{"exercises":exercise} },{returnOriginal:false})
// }
  res.status(200).json(user)
 }
  
 
 
 const modelAns = async(req,res) => {

    const  {Subtitle,id , Uid } = req.query
    //const {id} = req.params
    const userId = mongoose.Types.ObjectId(Uid)
    const courseId = mongoose.Types.ObjectId(id)
     var Ans = new Array();
     var model = new Array();
     var last = new Array();
     try{
     model = await Course.findOne({_id:id},{subtitles: {$elemMatch: {title : Subtitle }}})
     Ans = await individual.findOne({user:userId,'exercises.course' : courseId },{exercises: {$elemMatch: {course: courseId ,subtitle : Subtitle } }})
    
     for (i= 0 ; i<model.subtitles[0].exercise.length ; i++ )
     {
       if (Ans.exercises[0].answers[i])
       {
        last.push(model.subtitles[0].exercise[i])
        last.push(Ans.exercises[0].answers[i])
       }
       else
       {
        last.push(model.subtitles[0].exercise[i])
        last.push("not Answered")
       }
     }
     var modelAnswer = model.subtitles[0].exercise
     var answers = Ans.exercises[0].answers
     res.status(200).send({modelAnswer , answers })
     }
     catch(e){
         console.log(e)
         res.status(404).json(e)
     }
  
     }
  
    // const payForCourse = async(req,res =>{


    // })

    const paymentIntent =  async (req, res) => {      
            const {courseTitle}=req.body
       console.log(courseTitle)
            const c = await Course.findOne({title:courseTitle})
            const price = parseFloat(c.price) * ((100-((parseFloat(c.promotionAdmin.value))+(parseFloat(c.promotionInst.value))))/100);
           
            const paymentIntent = await stripe.paymentIntents.create({
              amount: price*100,
              currency: "eur",
              
    automatic_payment_methods: {
      enabled: true,
    },

            });

          
          
            res.send({
              clientSecret: paymentIntent.client_secret,
            });
      
    }



 const payForCourse  = async(req,res) =>{
        const {id,courseTitle} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"error"})
   }
    var userID = mongoose.Types.ObjectId(id)
    try
  {  
      const c = await Course.findOne({title:courseTitle})
     
    const price =parseFloat( c.price) * ((100-((parseFloat(c.promotionAdmin.value))+(parseFloat(c.promotionInst.value))))/100);
   
    var InstructorPriceDefault =parseFloat( c.price)*0.75;

    if(c.promotionInst.set==true){
        InstructorPriceDefault = InstructorPriceDefault*((100-((parseFloat(c.promotionInst.value))))/100)
    }
   
    var count=0
    c.subtitles.forEach(s=>{
        count+=1
       s.video.forEach(v=>{
           count+=1;
       })
   })
   console.log(c)
//    console.log(InstructorPriceDefault)
    const courses = {course:c._id,percentage:{progress:0,total:count}};
    const ind = await individual.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
    await Course.findOneAndUpdate({title:courseTitle},{$inc:{enrolledStudents:1}})
    await Instructor.findOneAndUpdate({user:c.instructor_id},{$inc:{amountOwed:InstructorPriceDefault}})
    res.status(200)
}
catch(error){
    res.status(404).json(error)
}
    }
    
    

     
module.exports = {
    RateCourse, AllCourses, RateInstructor, MyCourse ,VideoWatched,RegisterCourse , Notes ,solve,modelAns,getQusetions,
    payForCourse,paymentIntent
}