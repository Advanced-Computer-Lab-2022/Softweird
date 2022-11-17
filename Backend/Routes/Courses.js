const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getCourses , getOneCourse , addOneCourse,countryCurrency} = require('../Controller/Courses')




// get all courses 
router.get('/',getCourses)



//get one course 

router.get('/:id',getOneCourse)

//add new course

router.post('/',addOneCourse)



module.exports = router 

