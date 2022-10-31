const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')


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


module.exports = {getInstructorCourses}