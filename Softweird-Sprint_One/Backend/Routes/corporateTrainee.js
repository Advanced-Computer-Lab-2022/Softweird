const express = require ('express')
const router = express.Router()
const corporateTrainee =  require ('../Modules/corporateTrainee')
const {solve , grade,modelAns} = require('../Controller/IndividualTrainee')




// get all courses 

router.post('/solve/:id',solve)
router.get('/grade/:id',grade)
router.get('/modelAns/:id',modelAns)

module.exports = router