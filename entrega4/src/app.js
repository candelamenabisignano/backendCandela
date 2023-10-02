import express from 'express';
import cartRouter from "./routes/cart.router.js";
import productstRouter from "./routes/products.router.js";

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productstRouter);
app.use('/api/carts', cartRouter)

app.listen(8080)


