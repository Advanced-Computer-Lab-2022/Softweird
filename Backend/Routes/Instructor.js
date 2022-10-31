const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getInstructorCourses,addOneCourse } = require('../Controller/Instructor')




// get all courses 
router.get('/:id',getInstructorCourses)
router.post('/addOneCourse/:id',addOneCourse)


module.exports = router
