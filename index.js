const express =require('express');
const path= require('path');
const logger= require ('./middleware/logger');
const mongoose= require('mongoose');
const app= express();
const  bodyParser= require('body-parser');
const cors= require('cors');
const expressLayouts= require('express-ejs-layouts');


//db connection
const connectionString  = `mongodb+srv://Admin:admin123@e-site-qe6xd.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(connectionString, {useNewUrlParser:true ,useUnifiedTopology: true });
const dbConnection = mongoose.connection;


dbConnection.on('error', () =>{
    console.log(`Database connection failed`)
})

dbConnection.on("open", ()=> {
    console.log(`Database connected`)
})



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


//init middleware
// app.use(logger);



//Body Parser middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/',require('./routes/api/index'))
//products API routes
app.use('/products', require('./routes/api/products'));
//order api routes
app.use('/order', require('./routes/api/order'));
//user routes
app.use('/user', require('./routes/api/user'));

const PORT= process.env.PORT ||5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
