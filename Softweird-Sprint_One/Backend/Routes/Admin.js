const express = require ('express')
const router = express.Router()

const {getreportsUnSeen,getreportsSolved,getreportsPending ,addFollowUp , getfollow,solveR,OpenR , getreports}= require("../Controller/Admin")




router.get('/getreportsUnSeen',getreportsUnSeen)
router.post('/getreportsSolved',getreportsSolved)
router.post('/getreportsPending',getreportsPending)
router.post('/addFollowUp',addFollowUp)
router.post('/getfollow',getfollow)
router.post('/solveR',solveR)
router.post('/OpenR',OpenR)
router.post('/getreports',getreports)

module.exports = router 