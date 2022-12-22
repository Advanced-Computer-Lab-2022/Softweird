const express = require ('express')
const router = express.Router()
const corporateTrainee =  require ('../Modules/CorporateTrainee')
const {solve , grade,modelAns ,getQusetions} = require('../Controller/corporateTrainee')




// get all courses 

router.post('/solve/:id',solve)
router.get('/grade/:id',grade)
router.get('/modelAns/:id',modelAns)
router.get('/getQusetions',getQusetions)
module.exports = router