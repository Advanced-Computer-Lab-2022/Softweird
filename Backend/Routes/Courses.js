const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getCourses , getOneCourse} = require('../Controller/Courses')




// get all courses 
router.get('/',getCourses)



//get one course 

router.get('/:id',getOneCourse)





module.exports = router 

