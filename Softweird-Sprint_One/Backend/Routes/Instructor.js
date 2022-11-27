const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const User = require('../Modules/Users')
const {getInstructorCourses,addOneCourse,addVideoForprev,addVideoForSub,makeExam} = require('../Controller/Instructor')




// get all courses 
router.get('/:id',getInstructorCourses)
router.post('/addOneCourse/:id',addOneCourse)
router.post('/Course/Subtitle/:id' , addVideoForSub)
router.post('/Course/:id',addVideoForprev)
router.post('/makeExam/:id',makeExam)

module.exports = router
