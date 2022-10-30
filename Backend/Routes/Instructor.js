const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getInstructorCourses} = require('../Controller/Instructor')


router.get('/course/:id',getInstructorCourses)


module.exports = router 