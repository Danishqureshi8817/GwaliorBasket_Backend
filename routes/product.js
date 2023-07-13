var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/add_new_product',upload.single('image'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into product(companyid, categoryid, productname, description, status, trending, deals, pricetype, image, createdat, updateat, createdby)values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryid,req.body.productname,req.body.description,req.body.status,req.body.trending,req.body.deals,req.body.pricetype,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],(error,result)=>{
    if(error){
        console.log("xxxxx"+error)
        res.status(500).json({status:false,message:"Server error..."})
    }
    else{
        res.status(200).json({status:true,message:"Product Registered Successfully..."})
    }
  }) 
});


router.get('/fetch_all_product', function(req, res, next) {
    pool.query("select p.*,(select cc.category from category cc where cc.categoryid=p.categoryid) as categoryname,(select c.companyname from company c where c.companyid=p.companyid) as companyname,(select pt.pricetype from pricetype pt where pt.pricetypeid=p.pricetype ) as pricetype from product p",(error,result)=>{
      if(error){
        console.log(error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,data:result})
      }
    })
  });


  
  router.post('/edit_product_data' , function(req, res, next) {
  
    pool.query("update product set companyid=?, categoryid=?, productname=?, description=?, status=?, trending=?, deals=?, pricetype=?,  updateat=?, createdby=? where productid=? ",[req.body.companyid,req.body.categoryid,req.body.productname,req.body.description,req.body.status,req.body.trending,req.body.deals,req.body.pricetype,req.body.updateat,req.body.createdby,req.body.productid],(error,result)=>{
      if(error){
          console.log("xxxxx"+error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,message:"Company Updated Successfully..."})
      }
    }) 
  });


  router.post('/edit_product_image',upload.single('image'), function(req, res, next) {
  
    pool.query("update product set image=? where productid=?", [req.file.originalname,req.body.productid],(error,result)=>{
      if(error){
          console.log("xxxxx"+error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,message:"Image Updated"})
      }
    }) 
  });


  router.post('/delete_product_data' , function(req, res, next) {
  
    pool.query("delete from product where productid=? ",[req.body.productid],(error,result)=>{
      if(error){
          console.log("xxxxx"+error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,message:"Product Deleted Successfully..."})
      }
    }) 
  });



  router.get('/fetch_all_pricetype', function(req, res, next) {
    pool.query("select * from pricetype",(error,result)=>{
      if(error){
        console.log(error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,data:result})
      }
    })
  });









module.exports = router;
