const mongoose = require('mongoose')
const individualTrainee =  require ('../Modules/IndividualTrainee')
const Course = require('../Modules/Course')
const report = require('../Modules/report')


const getreportsSolved = async(req,res) => {
    const {id} = req.query
    var AdminId = mongoose.Types.ObjectId(id)
    var r = new Array();
    r =  await report.find( {adminSolver :AdminId ,solved:'resolved' } )  // reporter:inst 

  console.log(r)
    res.status(200).send({r})
     }
     const getreportsPending = async(req,res) => {
        const {id} = req.query
        var AdminId = mongoose.Types.ObjectId(id)
        var r = new Array();
        r =  await report.find( {adminSolver :AdminId ,solved:'pending' } )  // reporter:inst 
    
      console.log(r)
        res.status(200).send({r})
         }

     const getreportsUnSeen = async(req,res) => {

        var r = new Array();
        r =  await report.find( {adminSeen : false} )  // reporter:inst 
    
      console.log(r)
        res.status(200).send({r})
         }
    
     const getfollow = async(req,res) => {
        const {id} = req.query
      
        var inst = mongoose.Types.ObjectId(id)
        var f = new Array();
        f =  await report.find({ _id :id })  // reporter:inst 
        await report.findOneAndUpdate({  _id :id  } , { $set:{adminMessegeSeen:true}} ) 
        var r = f[0].followUp
        var s = f[0].solved
      console.log(r)
        res.status(200).send({r , s })
         }

         const addFollowUp = async(req,res) => {
            const {Rid , Aid , follow} = req.query
            var AdminId   =mongoose.Types.ObjectId(Aid)
            var reportId =mongoose.Types.ObjectId(Rid)
            
           
    await report.findOneAndUpdate({ adminSolver :AdminId , _id :reportId  } , {$push:{followUp:{from : "Admin",body : follow} } , $set:{reporterMessegeSeen:false}})  // reporter:inst 
      console.log(follow)
      var r = ''
             res.status(200).send({r})
             }

             const OpenR = async(req,res) => {
                const {Rid , Aid} = req.query
                var AdminId   =mongoose.Types.ObjectId(Aid)
                var reportId =mongoose.Types.ObjectId(Rid)
                
               
        await report.findOneAndUpdate({_id :reportId  } , {$set:{ adminSolver :AdminId  , adminSeen : true } })  // reporter:inst 
         
                 res.status(200)
                 }

             
         const solveR = async(req,res) => {
            const {Rid , Aid } = req.query
            var AdminId   =mongoose.Types.ObjectId(Aid)
            var reportId =mongoose.Types.ObjectId(Rid)
            
           
    await report.findOneAndUpdate({ adminSolver :AdminId , _id :reportId  } , {$set:{solved:'resolved'}})  // reporter:inst 
     
    
             res.status(200)
             }

             const getreports = async(req,res) => {
              const {id} = req.query
              var Id = mongoose.Types.ObjectId(id)
              var r = new Array();
              r =  await report.find({_id:Id})  // reporter:inst 
          
            console.log(r[0])
              res.status(200).send({r})
               }

module.exports = {getreportsUnSeen,getreportsSolved,getreportsPending ,addFollowUp , getfollow,solveR,OpenR ,getreports}




