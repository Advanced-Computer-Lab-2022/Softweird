const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')


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


module.exports = {getInstructorCourses,addOneCourse}