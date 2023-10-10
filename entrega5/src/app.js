import express from 'express';
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js';
import productsRouter from "./routes/products.router.js"
import {Server} from 'socket.io';
import { __dirname } from './utils.js';
import productsManager from './managers/productsManager.js';

const manager= new productsManager(`${__dirname}/files/products.json`);

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use('/api/products', productsRouter)

const server= app.listen(8080, ()=> console.log('server running'));

const socketServer = new Server(server);

socketServer.on('connection', socket=>{
    socket.on('deleteProducts', async data=>{

        try {
            await manager.deleteProductById(data);
            const products= await manager.getProducts();
            socket.emit('productsNew', products);

        } catch (error) {
            console.log(error)
        }
    })
})

app.set('socketio', socketServer);






