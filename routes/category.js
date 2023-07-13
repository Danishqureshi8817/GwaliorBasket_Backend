var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/add_new_category',upload.single('icon'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into category ( companyid, category, description, icon, createdat, updateat, createdby)values(?,?,?,?,?,?,?)",[req.body.companyid,req.body.category,req.body.description,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],(error,result)=>{
    if(error){
        console.log("xxxxx"+error)
        res.status(500).json({status:false,message:"Server error..."})
    }
    else{
        res.status(200).json({status:true,message:"Category Add Successfully..."})
    }
  }) 
});


router.get('/fetch_all_category', function(req, res, next) {
    pool.query("select * from category ",(error,result)=>{
      if(error){
        console.log(error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
        console.log('data',result)
          res.status(200).json({status:true,data:result})
      }
    })
  });

  router.post('/edit_category_data' , function(req, res, next) {
  
    pool.query("update category set companyid=?, category=?, description=?, updateat=?, createdby=?  where categoryid=? ",[req.body.companyid,req.body.category,req.body.description,req.body.updateat,req.body.createdby,req.body.categoryid],(error,result)=>{
      if(error){
          console.log("xxxxx"+error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,message:"Category Updated Successfully..."})
      }
    }) 
  });

  router.post('/edit_category_icon',upload.single('icon'), function(req, res, next) {
  
    pool.query("update category set icon=? where categoryid=?", [req.file.originalname,req.body.categoryid],(error,result)=>{
      if(error){
          console.log("xxxxx"+error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,message:"Icon Updated"})
      }
    }) 
  });

  router.post('/delete_category_data' , function(req, res, next) {
  
    pool.query("delete from category where categoryid=? ",[req.body.categoryid],(error,result)=>{
      if(error){
          console.log("xxxxx"+error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,message:"Category Deleted Successfully..."})
      }
    }) 
  });



module.exports = router;