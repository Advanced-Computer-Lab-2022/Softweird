// const mongoose = require('mongoose')
// const Course =  require ('../Modules/Course')
// const Users = require('../Modules/Users')
// c
// const company=require('../Modules/Company')

// const RateCourse = async(req,res)=>{
//      const {subtitleNumber,courseId,rating} = req.body
//      const {id} = req.params
//        if(!mongoose.Types.ObjectId.isValid(id)){
//              return res.status(404).json({error})
//     }
    
//      var userid = mongoose.Types.ObjectId(id)
//      try{
//      const corp = await corporate.findOne({user:userid})
//      const courses = corp.courseInfo
//      var i = 0;
//      var sumRate=0
//      var num = 0;
//        if(!mongoose.Types.ObjectId.isValid(courseId)){
//              return res.status(404).json({error})
//     }
//      var courseID = mongoose.Types.ObjectId(courseId)
//      courses.map(element => {
        
//          if(element.course == courseID){
//              if(element.rating.find(e => e>-1)!=undefined){
//                  i=1;
//              }
//              var oldRate = element.rate[subtitleNumber-1]
//              element.rate[subtitleNumber-1] = rating
//              element.rate.forEach(e => {
//                  if(e>-1)
//                  {num++ 
//                  sumRate+=e
//                  }

                 
//              });
//          }
         
//      });
//      var sumOld = 0
//      var numOld = 0
//      if(oldRate!=-1) {sumOld = sumRate-rate+oldRate 
//      numOld=num
//      }
//      else {
//          sumOld = sumRate-rate
//          numOld=num-1
//      }
//      var rateNew = sumRate/num
//      var rateOld = sumOld/numOld
//     await corporate.findOneAndUpdate(({user:userid}),{$set:{courseInfo :courses }})
//      course = await Course.findById(courseId)
//     var rateCourse=0
//     if(i==1){
//         rateCourse = course.rating - rateOld + rateNew 
//     }
//     else rateCourse = course.rating + rateNew 

//     await Course.findByIdAndUpdate(courseId,{$set:{rating:rateCourse , numberRating:course.numberRating+i}})
//     res.status(200).json({success:"tammam"})
//      }
//      catch(error){
//          res.status(404).json(error)
//      }
//  }

//  const AllCourses = async (req,res)=>{
//      const {id}=req.params
//       if(!mongoose.Types.ObjectId.isValid(id)){
//              return res.status(404).json({error})
//     }
//      var userid = mongoose.Types.ObjectId(id)
//      try{
//     const AllCourses =await company.find({}).populate('courses')
//     const MyCourse =await corporate.findOne({user:userid})
//     res.status(200).send({AllCourses,MyCourse})
//      }
//      catch(error){
//          res.status(404).json(error)
//      }
//  }

//  const MyCourse = async (req,res)=>{
//     const {id}=req.params
//     const {courseTitle} = req.query
//     if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(404).json({error})
//    }
   
//     var userid = mongoose.Types.ObjectId(id)
//     try{
//    const course =await Course.findOne({title:courseTitle})
//    console.log(course._id)
//    const MyCourse =await corporate.findOne({user:userid,courseInfo:{$elemMatch:{course:course._id}}}).populate('courseInfo.course');
//    res.status(200).send(MyCourse)
//     }
//     catch(e){res.status(404).json(e)}
// }
// const VideoWatched = async (req,res) =>{
//     const {subtitleTitle,videoText,courseTitle}=req.body
//     const {id} =req.params
//       if(!mongoose.Types.ObjectId.isValid(id)){
//              return res.status(404).json({error:"error"})
//     }
//      var userID = mongoose.Types.ObjectId(id)
//      var c = await corporate.findOne({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}})
//      let coursenew
   
//      try{
//      if(c==null){
         
//          const course = {course:courseTitle , subtitlesWatched:[{
//              title:subtitleTitle,
//              video : [videoText]
//          }]}
         
//          coursenew= await corporate.findOneAndUpdate({user : userID},{$push:{videoWatched:course}},{returnOriginal: false})
      
//          }
//     else{
//         var s =await corporate.findOne({user : userID , videoWatched:{$elemMatch:{course:courseTitle}} ,
//             videoWatched:{$elemMatch:{subtitlesWatched:{$elemMatch:{title:subtitleTitle}}}}},{returnOriginal: false})
        

//         if(s===null){
//             const sub = {
//                 title:subtitleTitle,
//                 video : [videoText]
//             }
            
//             coursenew=await corporate.findOneAndUpdate({user:userID ,videoWatched:{$elemMatch:{course:courseTitle}}},{
//                 $push:{"videoWatched.$.subtitlesWatched":sub}},{returnOriginal: false})
//         }
//         var subtitle 
//          s.videoWatched.forEach(v=>{
//             if(v.course==courseTitle){subtitle=v.subtitlesWatched}
//         })
        
//         var neededSub = subtitle.map(s=>{
//             if (s.title==subtitleTitle){
//                 s.video.push(videoText)
//             }
//         })
      
//         console.log(subtitle)
//         coursenew= await corporate.findOneAndUpdate({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}},
//             {$set:{'videoWatched.$.subtitlesWatched':subtitle}},{returnOriginal: false})
//      }
     
//      res.status(200).json(coursenew)
//     }
//     catch(error){
//         res.status(404).json(error)
//     }
//  }

//  const RegisterCourse = async (req,res) =>{
//     const {courseTitle} = req.body;
//     const {id} = req.params;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//        return res.status(404).json({error:"error"})
// }
// try{
//       var userID = mongoose.Types.ObjectId(id)

//     const c = await Course.findOne({title:courseTitle})
//     if(c==null){
//         res.status(404).json({error:"no such course"})
//     }
//     const courses = {course:c._id};
//     const ind = await corporate.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
//     res.status(200).json(ind);
//    }
//    catch(error){res.status(404).json(error)};
// }

    
    
    
// module.exports = {
//     RateCourse, MyCourse, AllCourses, RegisterCourse, VideoWatched
// }


const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Users = require('../Modules/Users')

const Instructor = require ('../Modules/Instructor')
const refundRequests = require ('../Modules/RefundRequests')
const accessRequests = require ('../Modules/AccessRequests')
const corporate = require ('../Modules/CorporateTrainee')

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
        
         var i =await corporate.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:c._id}}},
            {$set:{'courseInfo.$.rating':true}},{returnOriginal:false})
        
            i=await corporate.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:c._id}}},
                {$set:{'courseInfo.$.rateCourse':rating}},{returnOriginal:false})
           

            var rate =(((parseFloat(c.rating)*c.numberRating)+parseInt(rating))/(c.numberRating+1))
            rate = Math.round(rate*10)/10
         
        const cnew = await Course.findOneAndUpdate({title:courseTitle},{$set:{rating:rate},$inc:{numberRating:1}},
            {returnOriginal:false})
        res.status(200).json(i)
     }
     catch(error){
         res.status(404).json(error)
     }

 }

 const AllCourses = async (req,res)=>{
    const {id}=req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json("No such Corporate")
   }
   else{
    var userid = mongoose.Types.ObjectId(id)
    try{  
   let myTitles=[];
   const MyCourse =await corporate.find({user:userid})
   console.log(MyCourse.length)
   for (var i=0; i<MyCourse.length; i++){
   ccc= MyCourse[0].courseInfo[i].course
   const titles = await Course.findById(ccc)
   //console.log(titles)
   myTitles.push(titles.title);
}
let all= MyCourse[0].courseInfo
       console.log(all[0].percentage)

       res.status(200).json({titles:myTitles,all:all})
    }
    catch(error){
       res.status(404).json(error)
   }
}}
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

const s = await corporate.findOne({user:userid})
    await corporate.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:course._id}}},{$set:{"courseInfo.$.firstOpen":false}},{returnOriginal:true})
    var firstOpen = false;
    s.courseInfo.forEach(c=>{
      
        if (c.course.equals(course._id) && c.firstOpen === true)
             firstOpen=true
     } )
console.log(firstOpen)
  
     const myCourse =await corporate.findOne({user:userid,courseInfo:{$elemMatch:{course:course._id}}});
    res.status(200).send({myCourse,course,firstOpen});
     }
     catch(e){res.status(404).json(e)}
 }

 const MyCourses = async (req,res) => {
     const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json(error)

}
try{
var userID = mongoose.Types.ObjectId(id)
const courses = await Course.find({})
const myCourses = await corporate.findOne({user:userID});
const instructors = await Instructor.find({})
res.status(200).json({myCourses,courses,instructors});
}
catch (error){
    res.status(404).json(error)
}
 }

 const RateInstructor = async (req,res) =>{
    const {rating,courseTitle} = req.body
     const {id} =req.params
    
     
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("invalid user")
}

    
   
     var userID = mongoose.Types.ObjectId(id)
   
     try{
         const course = await Course.findOne({title:courseTitle})
         const instructor = await Instructor.findOne({user:course.instructor_id})
         const rate = instructor.rating.rate
         const number = instructor.rating.numberPeople
         const newNumber = number+1
         const newRate = {
            rate: Math.round((((parseFloat(rate)*number)+parseInt(rating))/newNumber)*10)/10,
             numberPeople : newNumber
             }
            

         await Instructor.findOneAndUpdate({user:course.instructor_id},{$set:{rating:newRate}})
         
         var i =  await corporate.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:course._id}}},
            {$set:{'courseInfo.$.rateInst':true}},{returnOriginal:false})
           
         i =  await corporate.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:course._id}}},
                {$set:{'courseInfo.$.rateInstructor':rating}},{returnOriginal:false})    
         res.status(200).json(i)
     }
     catch(error){
         res.status(404).json(error)
     }


 }

//update watched videos
 const VideoWatched = async (req,res) =>{
    const {subtitleTitle,videoText,courseTitle}=req.body
    var cer=""
    console.log(subtitleTitle,videoText,courseTitle)
    const {id} =req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"error"})
    }
    const courseCon = await Course.findOne({title:courseTitle})
     var userID = mongoose.Types.ObjectId(id)
     var c = await corporate.findOne({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}})
     var u = await corporate.findOne({user:userID})
     let coursenew     
     try{
     if(c==null){
         
         const course = {course:courseTitle , subtitlesWatched:[{
             title:subtitleTitle,
             video : [videoText]
         }]}
         
         coursenew= await corporate.findOneAndUpdate({user : userID},{$push:{videoWatched:course}},{returnOriginal: false})
      
         }
    else{
        var s =await corporate.findOne({user : userID , videoWatched:{$elemMatch:{course:courseTitle}} ,
            videoWatched:{$elemMatch:{subtitlesWatched:{$elemMatch:{title:subtitleTitle}}}}},{returnOriginal: false})
        

        if(s===null){
            const sub = {
                title:subtitleTitle,
                video : [videoText]
            }
            
            coursenew=await corporate.findOneAndUpdate({user:userID ,videoWatched:{$elemMatch:{course:courseTitle}}},{
                $push:{"videoWatched.$.subtitlesWatched":sub}},{returnOriginal: false})
        }
       else {
           var subtitle =[]
         s.videoWatched.forEach(v=>{
            if(v.course==courseTitle){subtitle=v.subtitlesWatched}
        })
        
        var neededSub = subtitle.map(s=>{
            if (s.title==subtitleTitle ){
                if (!s.video.includes(videoText)){
                s.video.push(videoText)}
           
            }
        })
      
        
        coursenew= await corporate.findOneAndUpdate({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}},
            {$set:{'videoWatched.$.subtitlesWatched':subtitle}},{returnOriginal: false})}
     }
     var prog = 0
     courseCon.subtitles.map(s=>{
         if(s.title==subtitleTitle){
             s.video.map(v=>{
                 if(v.text==videoText){
                     prog=v.length
                 }
             })
         }
     })
      coursenew = await corporate.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseCon._id}}},{$inc:{"courseInfo.$.percentage.progress":prog}},{returnOriginal:false})
     
      console.log(coursenew)
      coursenew.courseInfo.forEach(c=>{
          console.log(c.course.equals(courseCon._id))
         
          console.log(c.percentage.progress>=c.percentage.total)
        if(c.course.equals(courseCon._id) && c.percentage.progress==c.percentage.total){
          cer="true"
       
      }
          

      })

      if(cer=="true"){
        coursenew = await corporate.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseCon._id}}},{$set:{"courseInfo.$.certificate":"true"}},{returnOriginal:false}).populate("user")
        coursenew = await corporate.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseCon._id}}},{$set:{"courseInfo.$.certDate":new Date()}},{returnOriginal:false}).populate("user")
        
      }
      res.status(200).json({coursenew,cer})
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

     const c = await Course.findOne({title:courseTitle})
     if(c==null){
         res.status(404).json({error:"no such course"})
     }
     var count=0
     var subtitle=0
     var exercise = 0
     var sub =[]
     var totExercise = 0 
      c.subtitles.forEach(s=>{
          subtitle=0
          exercise = 0 
          count+=s.totalHours;
          
         s.video.forEach(v=>{
             
             subtitle+=1
            
         })
         if(s.exercise.length!=0){ exercise+=1,totExercise+=1}
 
         sub.push({exercises:exercise,videos:subtitle})
     })
       var exPerc = count*0.05
       count+=exPerc*totExercise
     const courses = {course:c._id,percentage:{progress:0,total:count,exer:exPerc},subtitlesTotal:sub, registeredAt:new Date()};
     const ind = await corporate.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
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
     var c = await corporate.findOne({user:userID,notes:{$elemMatch:{course:courseTitle}}})
     let coursenew
   
     try{
     if(c==null){
         
         const course = {course:courseTitle , subtitleNotes:[{
            videoTitle:videoText,
             notes : notes
         }]}
         
         coursenew= await corporate.findOneAndUpdate({user : userID},{$push:{notes:course}},{returnOriginal: false})
      
         }
    else{
        var s =await corporate.findOne({user : userID , notes:{$elemMatch:{course:courseTitle}} ,
            notes:{$elemMatch:{subtitleNotes:{$elemMatch:{videoTitle:videoText}}}}},{returnOriginal: false})
        

        if(s===null){
            const sub = {
                videoTitle:videoText,
                notes : notes
            }
            
            coursenew=await corporate.findOneAndUpdate({user:userID ,notes:{$elemMatch:{course:courseTitle}}},{
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
      
        
        coursenew= await corporate.findOneAndUpdate({user:userID,notes:{$elemMatch:{course:courseTitle}}},
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
    var cer=""
    const  {Answers ,id,Subtitle ,courseId  } = req.query
    console.log(Subtitle,id)
   console.log()
  //  const {id} = req.params
   const userId = mongoose.Types.ObjectId(id)
   const cId = mongoose.Types.ObjectId(courseId)
     const model = await Course.findOne( {_id:cId},{subtitles: {$elemMatch: {title : Subtitle }}})
     const u = await corporate.findOne({user:userId})
     var exer
     u.courseInfo.forEach(p=>{
         if(p.course.equals(cId)){
             exer = p.percentage.exer;
           
         }
     })
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
const old =  await corporate.findOne({ user:userId,exercises:{$elemMatch:{course:cId,subtitle:Subtitle}}})
var p = (g/(model.subtitles[0].exercise.length)) * 100
const exercise = {course:cId,subtitle:Subtitle,answers:Answers,grade:p }
await corporate.findOneAndUpdate({user:userId,exercises:{$elemMatch:{subtitle:Subtitle,course:cId}}},
    {$pull:{exercises:{subtitle:Subtitle,course:cId}}})
 var user =  await corporate.findOneAndUpdate({ user:userId } ,{$push:{exercises:exercise} },{returnOriginal:false})
 if(p>30){
 user = await corporate.findOneAndUpdate({user:userId,courseInfo:{$elemMatch:{course:cId}}},{$inc:{"courseInfo.$.percentage.progress":exer}},{returnOriginal:false})
 }
 
 user.courseInfo.forEach(c=>{
     if(c.course.equals(cId) &&c.percentage.progress==c.percentage.total)
     cer="true"

 })

 if(cer=="true"){
   user = await corporate.findOneAndUpdate({user:userId,courseInfo:{$elemMatch:{course:cId}}},{$set:{"courseInfo.$.certificate":"true",
    $set:{"courseInfo.$.certDate":new Date()}}},{returnOriginal:false}).populate("user")
 }
  res.status(200).json({user,p,cer})
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
     Ans = await corporate.findOne({user:userId,'exercises.course' : courseId },{exercises: {$elemMatch: {course: courseId ,subtitle : Subtitle } }})
    
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


const reviewPost = async (req,res) =>{
    const {courseTitle,username,review} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)
const rev = { trainee: username,
    traineeId :userID,
    review : review,
    date :new Date()}
 
try{
   
    await Course.findOneAndUpdate({title:courseTitle,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
   await Course.findOneAndUpdate({title:courseTitle},{$push:{reviews:rev}},{returnOriginal:false})
   const c = await Course.findOne({title:courseTitle})
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}
}


const DeletereviewPost = async (req,res) =>{
    const {courseTitle} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)

 
try{
   
    await Course.findOneAndUpdate({title:courseTitle,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
   const c = await Course.findOne({title:courseTitle})
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}

}



const reviewPostInst = async (req,res) =>{
   
   
    const {instructor,username,review} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)

if(!mongoose.Types.ObjectId.isValid(instructor)){
    return res.status(404).json({error:"error"})
}
var inst = mongoose.Types.ObjectId(instructor)

const rev = { 
    trainee: username,
    traineeId :userID,
    review : review,
    date :new Date()}
 
try{

    await Instructor.findOneAndUpdate({user:inst,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
       
   await Instructor.findOneAndUpdate({user:inst},{$push:{reviews:rev}},{returnOriginal:false})
   const c = await Instructor.findOne({user:inst})
   console.log("ff")
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}
}


const DeletereviewPostInst = async (req,res) =>{
    const {instructor} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)
if(!mongoose.Types.ObjectId.isValid(instructor)){
    return res.status(404).json({error:"error"})
}
var InstID = mongoose.Types.ObjectId(instructor)

 
try{
   
    await Instructor.findOneAndUpdate({user:InstID,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
   const c = await Instructor.findOne({user:InstID})
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}

}

const AccessRequests = async (req,res) =>{
    
    const {courseId} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
       
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)
if(!mongoose.Types.ObjectId.isValid(courseId)){
    console.log("hhhi")
    return res.status(404).json({error:"error"})
}
var CID = mongoose.Types.ObjectId(courseId)


const a = {course:CID , state:"pending"}

try{
 
   await corporate.findOneAndUpdate({user:userID},
        {$push:{accessRequests:a}},{returnOriginal:false});
   
       
    

const cop=await corporate.findOne({user:userID}).populate("company")


const inc = cop.company.courses.some(c=>c.course.equals(CID));



var l =-1
if(inc==true){cop.company.courses.forEach(c=>{
    if(c.course.equals(CID)){
        l=c.level
    }
})}


    await accessRequests.create({Trainee:userID 
        ,Course:{course:CID,company:inc,level:l} ,CompanyName:cop.company.name,Level:cop.level,state:"pending" })
    const i =  await corporate.findOne({user:userID}).populate("company")
    res.status(200).json(i)

}
catch (error) {
    res.status(404).json(error)
}

}

const getMyProfile = async (req,res)=>{   //Editted by RANA!! NEW!!
    const {id} = req.params;  
    try {
         if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
        var cor = mongoose.Types.ObjectId(id)
         const corporateTrainee = await corporate.findOne({user:cor}).populate('company').populate('user');
         res.status(200).json(corporateTrainee);

    }
    catch(error){
        res.status(404).json(error);

    }
}


module.exports = {
    RateCourse, AllCourses, RateInstructor, MyCourse ,VideoWatched,RegisterCourse , Notes ,solve,modelAns,getQusetions,
    MyCourses,reviewPost ,DeletereviewPost ,reviewPostInst ,DeletereviewPostInst ,AccessRequests, getMyProfile
}