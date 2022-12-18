const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getCourses , getOneCourse,getMostViewed} = require('../Controller/Courses')




// get all courses 
router.get('/',getCourses)



//get one course 

router.get('/:id',getOneCourse)

router.get('/mostViewed',getMostViewed)





module.exports = router 

