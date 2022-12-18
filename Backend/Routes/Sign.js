const express = require ('express')
const router = express.Router()
const { signUp,login3,logout,addCompany,updateCompany}= require("../Controller/Sign")

router.post('/signUp', signUp)

router.post('/login',login3)

router.get('/logout', logout)

router.post('/addCompany',addCompany)

router.patch('/updateCompany/:id',updateCompany)

module.exports = router