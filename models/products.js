const mongoose= require('mongoose');

ProductSchema =  new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    name: {
      type:String
    },
  
    description: {
      type:String
    },
    price: {
      type:Number
     },
     createdAt :{
      type:Date,
      required:true,
      default:Date.now
     },
     Image :{
       type:String,
       required:true
     }

})

// const products= [
//     {
//       "id":1,
//       "name":"t-shirt",
//       "description":"Latest",
//       "price": 400     
//      },
//     {
//       "id":2,
//       "name":"trouser",
//       "description":"Imported",
//       "price":   1000 
//     },
//     {
//       "id":3,
//       "name":"skirts",
//       "description":" Long",
//       "price": 500

//     }
//   ];


const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;
