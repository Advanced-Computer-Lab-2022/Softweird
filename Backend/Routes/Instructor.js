const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {  getInstructorCourses,addOneCourse,getMyProfile,UpdateBiography, deleteCourse,
addVideo, deleteVideo, deleteSubtitle, addSubtitle,getOneCourse,FinishCourse,PromoteCourse,
InstructorCourses,makeExam,RemovePromote,UpdateVerify,editSummary,editPrice,deleteCourse2,deleteExam} = require('../Controller/Instructor')
const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')





// get all courses 
router.patch('/editSummary',editSummary)
router.patch('/editPrice',editPrice)
router.patch('/deleteExam',deleteExam)


router.patch('/updateVerify/:id',UpdateVerify)
router.get('/instCourses/:id',InstructorCourses)
router.get('/myCourses',getInstructorCourses)
router.get('/oneCourse/:id',getOneCourse)
router.post('/addOneCourse/:id',addOneCourse)
router.get('/myProfile/:id',getMyProfile)
router.patch('/updateMyBiography/:id',UpdateBiography)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.patch('/uploadVideo', addVideo)
router.patch('/addSubtitles', addSubtitle)
router.patch('/deleteVideo', deleteVideo )
router.patch('/deleteSubtitle', deleteSubtitle)
router.post('/forgetMyPass',ForgotPassword)
router.patch('/updateMyPass/:id',UpdatePass)
router.patch('/publishCourse',FinishCourse)
router.patch('/promoteCourse',PromoteCourse)
router.patch('/removePromote',RemovePromote)
router.post('/makeExam/:id',makeExam)
router.patch('/deleteCourse', deleteCourse)
router.patch('/deleteCourse2', deleteCourse2)

//router.patch ('/setPromotion',setPromotion)


module.exports = router
