import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from './utils.js';
import { initializePassport } from './config/passport.config.js';
import configs from './config.js';

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(cookieParser());

try {
    await mongoose.connect(configs.mongoUrl);
    console.log('DB connected');
} catch (error) {
    console.log(error.message);
}



app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter );

initializePassport();
app.use(passport.initialize());



app.listen(configs.port, ()=>console.log('server running'));
