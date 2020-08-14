const express= require('express');
const router=express.Router();
//const uuid = require('uuid'); 
const mongoose= require('mongoose');

const Order  = require('../../models/order');
const Product= require('../../models/products');

//get all orders
router.get('/',(req,res) => {
    Order.find()
    // .select("product quantity _id")
   .populate('product', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count:docs.length,
            orders:docs.map(doc =>{
                return{
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
    
});
//get single 
router.get('/:id', (req,res) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order =>{
        if(!order){
            return res.status(404).json({
                message:'Order not found'
            });
        }
        res.status(200).json({
            order:order
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    })
});

//create an order
router.post('/', (req,res) =>{
    Product.findById(req.body.productId)
    .then(product => {

        if(!product)
        {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const order= new Order({
            _id:  mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product:req.body.productId
        });
       return order
        .save()})
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:"Order stored",
                createdOrder: {
                    _id: result._id,
                    product:result.product,
                    quantity:result.quantity
                }
            });
        }).catch(err => {
            res.status(500).json({
                error:err
            })
        })
       
    })
    

router.delete('/:id',(req,res) =>{
    Order.deleteMany({_id:req.params.id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "Order deleted"
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports= router;