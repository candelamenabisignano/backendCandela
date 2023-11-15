import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from './utils.js';
import { initializePassport } from './config/passport.config.js';

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

try {
    await mongoose.connect('mongodb+srv://candelaMena:Candemena07@coderhouse-candela-mena.fxqdqtk.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('DB connected');
} catch (error) {
    console.log(error.message);
}

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret:'candelaMena',
    resave:true,
    saveUninitialized:true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter );



const port= 8080;
app.listen(port, ()=>console.log('server running'));

