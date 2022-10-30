const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Instructor =  require ('../Modules/Instructor')


const getCourses =  async (req,res) => {
    const course = await Course.find()
    res.status(200).json(course)
    
}

//get an instructor by id

const getInstructor =  async(id) => {
    if(id){
        const instructor = await Instructor.findById('635bdfe6064d4580135b0107').populate('user')
        return instructor
    }
}

const getOneCourse = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such course'})
    }
    const course = await Course.findById(id)
    if(!course){
        return res.status(404).json({error:'no such course'})
    }
    const instructor = getInstructor(course.instructor_id)
    return res.status(200).json({course, instructor})

}

const addOneCourse = (req,res) => {
    const {title , subtitle , price , summary } = req.body
    
}

module.exports = {
    getCourses , getOneCourse, addOneCourse 
    }
