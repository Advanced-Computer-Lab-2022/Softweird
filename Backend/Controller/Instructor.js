const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')


const getInstructorCourses =  async (req,res) => {
    const {id} = req.params   //Get id from instructor frontend
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid Instructor ID!'})
    }
    const course = await Course.find({'instructor' : {id}})  //instructor = id

    if(!course){
        return res.status(404).json({error:'no Courses found!'})
    }

    return res.status(200).json(course)

}

module.exports = {getInstructorCourses}
