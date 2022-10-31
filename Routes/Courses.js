const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getCourses , getOneCourse , addOneCourse,filterCourse} = require('../Controller/Courses')



// get all courses 
router.get('/',getCourses)

//get one course 

router.get('/:id',getOneCourse)
 
//add new course

//router.post('/',addOneCourse)

router.post('/filter',filterCourse)
module.exports = router 

