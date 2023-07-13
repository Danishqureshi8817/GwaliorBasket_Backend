var express = require('express');
var router = express.Router();
var pool = require('./pool')

/* GET home page. */
router.get('/fetch_all_states', function(req, res, next) {
  pool.query("select * from states",(error,result)=>{
    if(error){
        res.status(500).json({status:false,message:"Server error..."})
    }
    else{
        res.status(200).json({status:true,data:result})
    }
  })
});


router.post('/fetch_all_cities', function(req, res, next) {
    pool.query("select * from cities where stateid=?",[req.body.stateid],(error,result)=>{
      if(error){
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,data:result})
      }
    })
  });

module.exports = router;
