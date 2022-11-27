const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const User = require('../Modules/Users')

// get instructor course + search instructor
const getInstructorCourses =  async (req,res) => {
    const {value} = req.query
    const {instructor} = req.query  //Get id from instructor frontend
    if(instructor==undefined){
        return res.status(404).json({error:'404'})
    }
    let course 
    if(value === undefined){
        console.log(instructor)
         course = await Course.find({instructor_id: instructor }).sort({enrolledStudents :-1}) //instructor = id
    }
    else{
         course = await Course.find({$and:[{$or:[{title :  { $regex: value ,$options: 'i' }},
        {subject :  { $regex: value,$options: 'i' }}]},
        {instructor_id: instructor }]}).sort({enrolledStudents :-1}) //instructor = id
    }


    if(!course){
        return res.status(404).json({error:'no Courses found!'})
    }

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
    console.log(id)
    const name = await User.findById(inst)
    console.log(name)
    console.log(name._id)
    await Course.create({instructor: name.fName+" "+ name.lName, instructor_id: inst ,title: Title, subtitle: Subtitle,subject:Subject , price: Price, summary: Summary})
    console.log(Title)
    return res.status(201).json("Sucess")
}

 const addVideoForSub = async(req,res) => {
    const  {Title , Subtitle ,Video} = req.body
    sub = await Course.subtitles.find({title : Title})
    for( i = 0 ; i<sub.length ; i++)
    {
         sub[i].findOneAndUpdate({title : Subtitle} , {video:Video})
    }

  //  await Course.subtitles.findOneAndUpdate( {title : Title} , {$set:{subtitles:sub} })
    
    
}
const addVideoForprev = async(req,res) => {
    const  {Title,Preview} = req.body
    await Course.findOneAndUpdate( {"title" : Title} , {$set:{preview:Preview} }) /*(err) =>
{
    if(err)
    {
        console.log("Something wrong while adding video!");
    }
    else 
    {
        console.log("added !!")
    }
})*/
    
}

const makeExam = async(req,res) => {
const {Subtitle , Blk } = req.body



//let exer = {num:"" , question:0 , choices:[] , answer:""}
var arr = new Array()
for(i = 0 ; i<Blk.length/3;i++)
{
    const exer = { 
    number :"" +(i+1) ,
    question : Blk[i*3] ,
    choices : Blk[(i*3)+1] ,
    answer : Blk[(i*3)+2]};
    arr[i] = exer
}
console.log(Subtitle)
await Course.findOneAndUpdate( {subtitles: {$elemMatch: {title : Subtitle }}} , {$set:{"subtitles.0.exercise":arr} })
/*title : "kemo",
video : ["aa"],
totalHours : 5 ,
exercise : []*/
}
module.exports = {getInstructorCourses,addOneCourse,addVideoForprev,addVideoForSub,makeExam}