var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/fetch_all_productlist', function(req, res, next) {
    console.log("body id",req.body)

    pool.query("select * from product where categoryid=?",[req.body.categoryid],(error,result)=>{
      if(error){
        console.log("list ",error)
          res.status(500).json({status:false,message:"Server error..."})
      }
      else{
          res.status(200).json({status:true,data:result})
      }
    })
  });

router.post('/add_new_productlist',upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)

    var file_str=""
    req.files.map((item)=>{
        file_str+=item.filename+","
    })
   pool.query("insert into listproduct(companyid, categoryid, productid, weight, price, offerprice, description, images, createdat, updateat, createdby)values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryid,req.body.productid,req.body.weight,req.body.price,req.body.offerprice,req.body.description,file_str,req.body.createdat,req.body.updateat,req.body.createdby],(error,result)=>{
     if(error){
         console.log("xxxxx"+error)
         res.status(500).json({status:false,message:"Server error..."})
     }
     else{
         res.status(200).json({status:true,message:"Productlisted Successfully..."})
     }
   }) 

});


router.get('/fetch_all_productlist', function(req, res, next) {
    pool.query("select pl.*,(select cc.category from category cc where cc.categoryid=pl.categoryid) as categoryname,(select c.companyname from company c where c.companyid=pl.companyid) as companyname,(select p.productname from product p where p.productid=pl.productid ) as productname from listproduct pl",(error,result)=>{
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

