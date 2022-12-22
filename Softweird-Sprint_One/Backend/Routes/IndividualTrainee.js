const express = require ('express')
const router = express.Router()
const individualTrainee =  require ('../Modules/IndividualTrainee')
const {solve , grade,modelAns ,getQusetions ,reportProplem,getreportsR , getreportsP , addFollowUp , getfollow} = require('../Controller/IndividualTrainee')




// get all courses   addFollowUp

router.post('/solve',solve)
router.get('/grade',grade)
router.get('/modelAns',modelAns)
router.get('/getQusetions',getQusetions)
router.post('/reportProplem',reportProplem)
router.get('/getreportsR',getreportsR)
router.get('/getreportsP',getreportsP)
router.post('/addFollowUp',addFollowUp)
router.post('/getfollow',getfollow)
module.exports = router
