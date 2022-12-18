const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {RateCourse, AllCourses, RateInstructor, MyCourse , VideoWatched,RegisterCourse,Notes,
    solve ,modelAns ,getQusetions,payForCourse,paymentIntent} = require('../Controller/IndividualTrainee')
const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')

router.patch('/course/rate/:id', RateCourse)
router.patch('/instructor/rate/:id',RateInstructor)
router.get('/allCourses',AllCourses)
router.get('/myCourse/:id',MyCourse) 
router.patch('/updateMyPass/:id',UpdatePass)
router.post('/forgetMyPass',ForgotPassword)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.patch('/videoWatched/:id',VideoWatched)
router.patch('/notes/:id',Notes)
router.patch('/registerCourse/:id',RegisterCourse)

router.post('/solve',solve)
router.get('/modelAns',modelAns)
router.get('/getQusetions',getQusetions)
router.post('/payForCourse',payForCourse)
router.post('/paymentIntent',paymentIntent)

module.exports = router 