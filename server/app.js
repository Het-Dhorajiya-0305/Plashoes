import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartIteamRoutes from './routes/cartIteamRoute.js';
import orderRouter from './routes/ordersRoute.js';
import session from 'express-session';
import passport from 'passport';
import googleOauth from 'passport-google-oauth20';


const GoogleStrategy = googleOauth.Strategy;

const app = express()

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5175'
];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
))
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes);
app.use('/api/cartIteam', cartIteamRoutes)
app.use('/api/orders', orderRouter)
app.get('/', (req, res) => {
    res.send('API is running...')
})


export default app;

