const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {getCourses , getOneCourse,getMostViewed} = require('../Controller/Courses')




// get all courses 
router.get('/',getCourses)


router.get('/mostViewed',getMostViewed)

router.get('/:id',getOneCourse)







module.exports = router 

