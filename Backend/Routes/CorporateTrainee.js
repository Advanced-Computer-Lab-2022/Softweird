const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {RateCourse, MyCourse, AllCourses, RegisterCourse, VideoWatched} = require('../Controller/CorporateTrainee')
const {RateInstructor} = require('../Controller/IndividualTrainee')
const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')


router.patch('/updateMyPass/:id',UpdatePass)
router.patch('/course/rate/:id', RateCourse)
router.patch('/instructor/rate/:id',RateInstructor)
router.get('/allCourses',AllCourses)
router.get('/mycourse/:id',MyCourse) 
router.post('/forgetMyPass',ForgotPassword)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.patch('/videoWatched/:id',VideoWatched)
router.patch('/registerCourse/:id',RegisterCourse)
module.exports = router 