const mongoose = require('mongoose')
const individualTrainee =  require ('../Modules/IndividualTrainee')
const Course = require('../Modules/Course')
const report = require('../Modules/report')
const getQusetions =  async(req,res) => {
  const  {Subtitle ,courseId } = req.query

const ques =  await Course.find({_id:courseId},{subtitles: {$elemMatch: {title : Subtitle }}})

var r = ques[0].subtitles[0].exercise
console.log(r)
     
     res.status(200).send({r})
}
const solve = async(req,res) => {
   const  {Answers ,id,Subtitle ,courseId  } = req.query
 //  const {id} = req.params
  const userId = mongoose.Types.ObjectId(id)
  const cId = mongoose.Types.ObjectId(courseId)


 await individualTrainee.findOneAndUpdate({ user:userId , exercises : {$elemMatch: {course: cId ,subtitle : Subtitle}}} ,{$set:{"exercises.0.answers":Answers} })

console.log(Answers)
      
      res.status(200)
}
const grade = async(req,res) => {
   const  {Subtitle , id , Uid} = req.query
 //  const {id} = req.params
 const userId = mongoose.Types.ObjectId(Uid)
   const courseId = mongoose.Types.ObjectId(id)
var g = 0 ;
    var Ans = new Array();
    var model = new Array();
    model = await Course.find( {_id:id},{subtitles: {$elemMatch: {title : Subtitle }}} )
//console.log(model[0].subtitles[0].exercise[0].answer)
//await individualTrainee.findOneAndUpdate({exercises : {$elemMatch: {_id : '637d2782934796ba42c6fadb' }}} ,{$set:{"exercises.$.course" : "635a98e51afbdd2605905d6d"} })
        Ans = await individualTrainee.find({user:Uid,'exercises.course' : courseId },{exercises: {$elemMatch: {course: courseId ,subtitle : Subtitle } }})
//  console.log(Ans[0].exercises[0].answers)
console.log(id)
console.log(model[0].subtitles[0].exercise[1].answer)
console.log(Ans[0].exercises[0].answers)
 for (i= 0 ; i<Ans[0].exercises[0].answers.length ; i++ )
  {
    if (model[0].subtitles[0].exercise[i])
    {
    if (Ans[0].exercises[0].answers[i]=== model[0].subtitles[0].exercise[i].answer)
    {
         g = g+1;
         console.log(model[0].subtitles[0].exercise[i].answer)
         console.log(Ans[0].exercises[0].answers[i])
         console.log(g)
    }
  }
  var p = (g/(model[0].subtitles[0].exercise.length)) * 100
 
  }
  res.status(200).send({p})

    //{questionsSchema : { $elemMatch: 
     //, Suptitles: {$elemMatch: {suptitle:Suptitle }}
 }
 const modelAns = async(req,res) => {
  const  {Subtitle,id , Uid } = req.query
  //const {id} = req.params
  const userId = mongoose.Types.ObjectId(Uid)
  const courseId = mongoose.Types.ObjectId(id)
   var Ans = new Array();
   var model = new Array();
   var last = new Array();
   model = await Course.find({_id:id},{subtitles: {$elemMatch: {title : Subtitle }}})
   Ans = await individualTrainee.find({user:userId,'exercises.course' : courseId },{exercises: {$elemMatch: {course: courseId ,subtitle : Subtitle } }})
console.log(model[0].subtitles[0].exercise)
   for (i= 0 ; i<model[0].subtitles[0].exercise.length ; i++ )
   {
     if (Ans[0].exercises[0].answers[i])
     {
      last.push(model[0].subtitles[0].exercise[i])
      last.push(Ans[0].exercises[0].answers[i])
     }
     else
     {
      last.push(model[0].subtitles[0].exercise[i])
      last.push("not Answered")
     }
   }
   var m = model[0].subtitles[0].exercise
   var a = Ans[0].exercises[0].answers
   console.log(m)
   console.log(a)
   res.status(200).send({m , a })
  

   }
  
   const reportProplem = async(req,res) => {
    const  {id ,Title,Body,Type} = req.query
    var inst = mongoose.Types.ObjectId(id)

     await report.create({title:Title , body:Body , reporter:inst , adminSeen:false , reporterSeen:true , type:Type , solved : 'pending'})
     console.log ("reported")
     }

     const getreportsR = async(req,res) => {
      const {id} = req.query
      var inst = mongoose.Types.ObjectId(id)
      var r = new Array();
      r =  await report.find({ reporter :id , solved :'resolved' })  // reporter:inst 

    console.log(r)
      res.status(200).send({r})
       }

       const getreportsP = async(req,res) => {
        const {id} = req.query
        var inst = mongoose.Types.ObjectId(id)
        var r = new Array();
        r =  await report.find({ reporter :id , solved :'pending' })  // reporter:inst 
  
      console.log(r)
        res.status(200).send({r})
         }

       const getfollow = async(req,res) => {
        const {id} = req.query
      
        var inst = mongoose.Types.ObjectId(id)
        var f = new Array();
        f =  await report.find({ _id :id })  // reporter:inst 
        await report.findOneAndUpdate({  _id :id  } , { $set:{reporterMessegeSeen:true}} )  // reporter:inst 

        var r = f[0].followUp
        var s = f[0].solved
      console.log(r)
        res.status(200).send({r , s })
         }
    
       const addFollowUp = async(req,res) => {
        const {Rid , Uid , follow} = req.query
        var UserId   =mongoose.Types.ObjectId(Uid)
        var reportId =mongoose.Types.ObjectId(Rid)
        
       
         await report.findOneAndUpdate({ reporter :UserId , _id :reportId  } , {$push:{followUp:{from : "trainee",body : follow }} , $set:{adminMessegeSeen:false} })  // reporter:inst 
  console.log(follow)
  var r = ''
         res.status(200).send({r})
         }
      


module.exports = {solve,grade,modelAns,getQusetions,reportProplem ,getreportsR,getreportsP ,addFollowUp , getfollow}




