const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')



const getCourses =  async (req,res) => {
    const course = await Course.find()
    res.status(200).json(course)
    
    
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

    return res.status(200).json(course)

}

const addOneCourse = (req,res) => {
    const {title , subtitle , price , summary } = req.body
    
}

module.exports = {
    getCourses , getOneCourse
}