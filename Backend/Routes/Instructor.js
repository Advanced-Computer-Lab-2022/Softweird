const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getInstructorCourses } = require('../Controller/Instructor')




// get all courses 
router.get('/:id',getInstructorCourses)

module.exports = router
