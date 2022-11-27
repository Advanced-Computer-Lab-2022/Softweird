const mongoose = require('mongoose')
const corporateTrainee =  require ('../Modules/corporateTrainee')
const Course = require('../Modules/Course')


const solve = async(req,res) => {

      /*
    * in this method we take the subtitle from the frontend and
    * the answer from the traniee then push this answer to 
    * the database instade of the old answer
    */
   const  {Subtitle , Answers } = req.body
   const {id} = req.params
   const courseId = mongoose.Types.ObjectId(id)
 //  await individualTrainee.create({username: "samy",password:"semsem" ,exercises : [{course : "635a98e51afbdd2605905d6d"}, {subtitle:" rsghtj" },{answers: ["kofta"]}]})
 await corporateTrainee.findOneAndUpdate({exercises : {$elemMatch: {course: courseId ,subtitle : Subtitle}}} ,{$set:{"exercises.0.answers":Answers} })
   //  await individualTrainee.findOneAndUpdate({exercises : {$elemMatch: {course:"635a98e51afbdd2605905d6d" ,subtitle : "andrew1"}}} ,{$set:{"exercises.0.answers":Answers} })
    //{exercises : {$elemMatch: {course:Course , subtitle:Subtitle}}} ,
    
}
const grade = async(req,res) => {

     /*
    * in this method we take the subtitle from the frontend and
    * use function to get the the correct answer from course module
    * and answers from corporate traniee module then compare them
    * with eachother and get the grade
    */
   const  {Subtitle} = req.body
   const {id} = req.params
   const courseId = mongoose.Types.ObjectId(id)
var g = 0 ;
    var Ans = new Array();
    var model = new Array();
    model = await Course.find( {_id:courseId},{subtitles: {$elemMatch: {title : Subtitle }}} )
//console.log(model[0].subtitles[0].exercise[0].answer)
//await individualTrainee.findOneAndUpdate({exercises : {$elemMatch: {_id : '637d2782934796ba42c6fadb' }}} ,{$set:{"exercises.$.course" : "635a98e51afbdd2605905d6d"} })
        Ans = await corporateTrainee.find({'exercises.course' : courseId },{exercises: {$elemMatch: {course: courseId ,subtitle : Subtitle } }})
//  console.log(Ans[0].exercises[0].answers)
console.log(courseId)
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
 
  }
  res.status(200).json({g})

    //{questionsSchema : { $elemMatch: 
     //, Suptitles: {$elemMatch: {suptitle:Suptitle }}
 }
 const modelAns = async(req,res) => {

    /*
    * in this method we take the subtitle from the frontend and
    * use function to get the exam from course module
    * and answers from corporate traniee module then push the
    * each question , choises , answer then the student answer
    * in array called last 
    */
  const  {Subtitle} = req.body
  const {id} = req.params
  const courseId = mongoose.Types.ObjectId(id)
   var Ans = new Array();
   var model = new Array();
   var last = new Array()
   model = await Course.find( {_id:courseId},{subtitles: {$elemMatch: {title : Subtitle }}} )
   Ans = await corporateTrainee.find({'exercises.course' : courseId },{exercises: {$elemMatch: {course: courseId ,subtitle : Subtitle } }})

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
   res.status(200).json({last})

 
   }


module.exports = {solve,grade,modelAns}