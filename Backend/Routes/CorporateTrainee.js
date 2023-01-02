const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {RateCourse, AllCourses, RateInstructor, MyCourse , VideoWatched,RegisterCourse,Notes,
    solve ,modelAns ,getQusetions,MyCourses,reviewPost,DeletereviewPost, AccessRequests,
    reviewPostInst ,DeletereviewPostInst,getMyProfile} = require('../Controller/CorporateTrainee')
const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')

router.patch('/course/rate/:id', RateCourse)
router.patch('/instructor/rate/:id',RateInstructor)
router.get('/allCourses/:id',AllCourses)
router.get('/myCourse/:id',MyCourse) 
router.get('/myCourses/:id',MyCourses) 
router.patch('/updateMyPass/:id',UpdatePass)
router.post('/forgetMyPass',ForgotPassword)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.patch('/videoWatched/:id',VideoWatched)
router.patch('/notes/:id',Notes)
router.patch('/registerCourse/:id',RegisterCourse)

router.post('/solve',solve)
router.get('/modelAns',modelAns)
router.get('/getQusetions',getQusetions)

router.patch('/reviewCourse/:id',reviewPost)
router.patch('/deleteReviewCourse/:id',DeletereviewPost)

router.patch('/reviewInst/:id',reviewPostInst)
router.patch('/deleteReviewInst/:id',DeletereviewPostInst)

router.patch('/accessRequests/:id',AccessRequests)
router.get('/getMyProfile/:id',getMyProfile)
module.exports = router 