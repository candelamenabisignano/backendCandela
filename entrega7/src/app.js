import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from './utils.js';

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter );

try {
    await mongoose.connect('mongodb+srv://candelaMena:Candemena07@coderhouse-candela-mena.fxqdqtk.mongodb.net/?retryWrites=true&w=majority') 
     console.log('DB connected');
 } catch (error) {
     console.log(error.message)
 };

 const port= 8080;
app.listen(port, ()=>console.log('server running'));

