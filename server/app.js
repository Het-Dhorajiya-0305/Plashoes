import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartIteamRoutes from './routes/cartIteamRoute.js';


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))

app.use('/user', userRoutes)
app.use('/product', productRoutes);
app.use('/cartIteam',cartIteamRoutes)


export default app;

