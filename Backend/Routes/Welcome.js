const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {search} = require('../Controller/Search')
const {UpdatePass, ForgotPassword,UpdateEmail,
    reportProplem,getreports , addFollowUp , getfollow} = require('../Controller/ProfileInfo')


// search for courses 
router.get('/search',search)
router.patch('/updateMyPass/:id',UpdatePass)
router.patch('/updateMyEmail/:id',UpdateEmail)
router.post('/forgetMyPass',ForgotPassword)
router.post('/reportProplem',reportProplem)
router.get('/getreports',getreports)
// router.get('/getreportsP',getreportsP)
router.post('/addFollowUp',addFollowUp)
router.get('/getfollow',getfollow)

module.exports = router 

