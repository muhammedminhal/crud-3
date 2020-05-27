var express = require('express');
var router = express.Router()
var mongoose = require('mongoose')
var Student = mongoose.model('student')


router.get("/user",(req,res)=>{
    res.render("users/user",{title:'Please Enter Student Details'})
});


router.post('/user',(req,res)=>{
    var minhal = new Student({
        name :req.body.name,
        age :req.body.age,
        place:req.body.place,
        email:req.body.email
    });
    minhal.save((err ,doc)=>{
        if(doc)
       { 
        res.redirect('/user/list');
        console.log(err)
        }
        if(err)
       { 
        res.send('Error occured');
        }
    });
})

// list route
router.get('/list',(req,res)=>{
   
    Student.find((err,docs)=>{
        if(!err)
        res.render('users/list',{data:docs})
        else
        res.send('error:'+err)
       console.log(docs)
    })
})


// show  element route

  
router.get('/edit/:id',(req, res)=>{
    Student.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,doc)=>{
      if(!err){
          
        res.render("users/edit",{ viewTitle: "Update STudents",data: doc });
      }
    });
  });


  router.post('/edit/:id',(req,res)=>{
    Student.findByIdAndUpdate({_id:req.params.id},req.body,(err,body)=>{
        if(!err){
            res.redirect("/user/list")
        }
    })
  })

  router.get('/delete/:id',(req,res)=>{
      Student.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
          if(err){
              res.send(err)
          }else{
              res.redirect('/user/list')
          }
      })
  })

  


module.exports=router;