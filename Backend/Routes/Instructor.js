const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {  getInstructorCourses,addOneCourse,getMyProfile,UpdateBiography, 
addVideo, deleteVideo, deleteSubtitle, addSubtitle,getOneCourse,FinishCourse} = require('../Controller/Instructor')
const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')





// get all courses 
router.get('/myCourses',getInstructorCourses)
router.get('/oneCourse/:id',getOneCourse)
router.post('/addOneCourse/:id',addOneCourse)
router.get('/myProfile/:id',getMyProfile)
router.patch('/updateMyBiography/:id',UpdateBiography)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.patch('/uploadVideo', addVideo)
router.patch('/addSubtitles', addSubtitle)
router.delete('/deleteVideo', deleteVideo )
router.delete('/deleteSubtitle', deleteSubtitle )
router.post('/forgetMyPass',ForgotPassword)
router.patch('/updateMyPass/:id',UpdatePass)
router.patch('/publishCourse',FinishCourse)

//router.patch ('/setPromotion',setPromotion)


module.exports = router
