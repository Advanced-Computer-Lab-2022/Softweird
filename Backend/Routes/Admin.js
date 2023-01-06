const express = require ('express')
const router = express.Router()

const {getreports ,addFollowUp , getfollow,solveR,OpenR , getreport , solveAccess , solveRefund,pendingR,
    getRefunds,getAccess,RemovePromote,PromoteCourse, getMyProfile}= require("../Controller/Admin")
    const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')




router.get('/getreports',getreports)
router.post('/addFollowUp',addFollowUp)
router.get('/getfollow',getfollow)
router.post('/solveR',solveR)
router.post('/pendingR',pendingR)
router.post('/OpenR',OpenR)
router.post('/getreport',getreport)
router.post('/solveAccess',solveAccess)
router.post('/solveRefund',solveRefund)
router.get('/getRefunds',getRefunds) 
router.get('/getAccess',getAccess)
router.patch('/updateMyPass/:id',UpdatePass)
router.post('/forgetMyPass',ForgotPassword)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.patch('/removePromote',RemovePromote)
router.patch('/promoteCourse',PromoteCourse)
router.get('/getMyProfile/:id',getMyProfile)
module.exports = router 