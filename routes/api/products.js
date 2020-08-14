const express= require('express');
const router=express.Router();
// const uuid = require('uuid'); 
const Product= require('../../models/products');
const mongoose= require('mongoose');


//get all the products
router.get('/',(req,res) => {
    Product.find()
    .select("name description price _id")
     .exec()
     .then(docs => {
        res.render('products/index',{docs});
    //     const response= {
    //         count:docs.length,
    //         products:docs
    //     };
    //     res.status(200).json(response);
     })
    .catch(err => {
        console.log(err);
        res.status(500).json({ 
            error:err});
    });
});


//search a product 
router.get('/',(req,res) => {
    let searchOptions ={}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name= new RegExp(req.query.name, i);

           Product.find(searchOptions)
    // .select("name description price _id")
    .exec()
    .then(doc => {
    //     console.log(doc);
    //     if(doc){
    //         res.status(200).json({
    //             product :doc
    //         });
    //     }else{
    //         res.status(404).json({msg:'No product found.Enter a valid id '});
    //     } 
        res.render('products/index' ,{
            products:products,
            searchOptions:req.query
        })
    
     })
    .catch(err => {
    //     console.log(err);
         res.status(500).json({error:err});
     });



    }
})


//new  product
router.get('/:id', (req,res) => {
    res.render('products/new', {product :new Product()});
    // const id = req.params.id;

    // Product.findById(id)
    // .select("name description price _id")
    // .exec()
    // .then(doc => {
    //     console.log(doc);
    //     if(doc){
    //         res.status(200).json({
    //             product :doc
    //         });
    //     }else{
    //         res.status(404).json({msg:'No product found.Enter a valid id '});
    //     }        
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({error:err});
    // });
});

//create a product
router.post('/' ,(req,res) => {
    
        console.log(req.file);
        const newProduct = new Product({
        // id:uuid.v4(),
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        
    });


    if(!newProduct.name || !newProduct.description || !newProduct.price){
        return res.status(400).json({msg: 'Please include a name, description and a price'});
    }
    newProduct.
    save()
    .then(result =>{
        res.redirect(`products/${result.id}`);
    //     
    //     console.log(result);
    //     res.status(201).json({
    //         msg: 'Added a product successfully',
    //         createdProduct:{
    //             name: result.name,
    //             description: result.description,
    //             price:result.price,
    //             _id:result._id
    //         }
    //     });
     }
    ).catch(err => {
        // console.log(err);
        // res.status(500).json({
        //     error:err
        // });
        res.redirect('/');
    });

});


//update a product
router.put('/:id',(req,res) => {
    
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id:id}, { $set:updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated'
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

//delete a product
router.delete('/:id', (req,res) =>{
   const id= req.params.id;
   Product.deleteMany({_id:id})
   .exec()
    .then(result => {
        res.status(200).json({
            message:'Product deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
})

module.exports= router;