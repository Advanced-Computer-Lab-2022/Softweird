const express = require ('express')
const router = express.Router()
const user =  require ('../Modules/Users')
const {addAdmin, addInstructor, addCorporate}= require('../Controller/AdminAdd')


//add another admin
router.post('/admin',addAdmin)

//add instructor
router.post('/inst',addInstructor)

//add corprate tranieee
router.post('/corp',addCorporate)

module.exports = router 