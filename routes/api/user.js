const express =require('express');
const router= express.Router();
const mongoose= require('mongoose');
const bcryptjs= require('bcryptjs');
// const jwt= require('jsonwebtoken');

const User= require('../../models/user');

router.post('/signup',(req,res) =>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length >=1){
            return res.status(409).json({
                message:'cannnot have two account to same mail'
            })
        }else{
            bcryptjs.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user = new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password:hash
        
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message:'user created'
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        })
                    });
                }
            });
        }
    })
    
});


router.post('/login', (req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(401).json({
                message:"Auth failed"
            })
        }
        bcryptjs.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Auth failed'
                });
            }
            if(result){

                return res.status(200).json({
                    message:'Auth successful',
                    
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            })
        })

    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})

router.delete("/:id", (req,res) => {
    User.deleteMany({ _id:req.params.id})
    .exec()
    .then(res => {
        res.status(200).json({
            message:'User  deleted'
        })
}).catch(err =>{
    console.log(err);
    res.status(500).json({
        error:err
    })
})
});

module.exports=router;