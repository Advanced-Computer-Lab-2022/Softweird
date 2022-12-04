const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {RateCourse, AllCourses, RateInstructor, MyCourse , VideoWatched} = require('../Controller/IndividualTrainee')
const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')

router.patch('/course/rate/:id', RateCourse)
router.patch('/instructor/rate/:id',RateInstructor)
router.get('/allCourses',AllCourses)
router.get('/mycourse/:id',MyCourse)  //query?
router.patch('/updateMyPass/:id',UpdatePass)
router.post('/forgetMyPass',ForgotPassword)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.patch('/videoWatched/:id',VideoWatched)
module.exports = router 