// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import userRouter from './routes/userRoute.js';
// import productRouter from './routes/productRouter.js';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import recommendationRouter from './routes/RecommendationRoute.js';



// // APP CONFIG
// const app = express();
// const port = process.env.PORT || 4000;
// connectDB();
// connectCloudinary();

// // MIDDLEWARES
// app.use(cors({...}));
// app.use(express.json());
// // app.use(cors());

// // app.use(cors({
// //   origin: "https://forever-website-frontend-amber.vercel.app",
// // }));

// const allowedOrigins = [
//   "https://forever-website-frontend-amber.vercel.app",
//   "https://forever-website-admin-coral.vercel.app",
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));



// // API ENDPOINTS 
// app.use('/api/user',userRouter);
// app.use('/api/product',productRouter);
// app.use('/api/cart',cartRouter);
// app.use('/api/order',orderRouter);
// app.use('/api/recommendations', recommendationRouter);   // ← NEW

// app.get('/',(req,res)=>{
//     res.send("API Working.");
// });


// app.listen(port, () => {
//     console.log(`Server running on PORT ${port}`);
// });







// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import userRouter from './routes/userRoute.js';
// import productRouter from './routes/productRouter.js';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import recommendationRouter from './routes/RecommendationRoute.js';

// const app = express();
// const port = process.env.PORT || 4000;
// connectDB();
// connectCloudinary();

// const allowedOrigins = [
//   "https://forever-website-frontend-amber.vercel.app",
//   "https://forever-website-admin-coral.vercel.app",
// ];

// // MIDDLEWARES
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));
// app.use(express.json());

// // API ENDPOINTS
// app.use('/api/user', userRouter);
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/order', orderRouter);
// app.use('/api/recommendations', recommendationRouter);

// app.get('/', (req, res) => {
//   res.send("API Working.");
// });

// app.listen(port, () => {
//   console.log(`Server running on PORT ${port}`);
// });










// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import userRouter from './routes/userRoute.js';
// import productRouter from './routes/productRouter.js';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import recommendationRouter from './routes/recommendationRoute.js';

// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();
// connectCloudinary();

// // ─── Allowed origins list ────────────────────────────────────────────────────
// const ALLOWED_ORIGINS = [
//     'http://localhost:5173',
//     'http://localhost:5174',
//     process.env.FRONTEND_URL,  // set in Vercel env vars
//     process.env.ADMIN_URL,     // set in Vercel env vars
// ].filter(Boolean);

// // ─── CORS ────────────────────────────────────────────────────────────────────
// const corsOptions = {
//     origin: (origin, callback) => {
//         // no origin = Postman / mobile / server-to-server → allow
//         if (!origin) return callback(null, true);
//         if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
//         console.log('CORS blocked origin:', origin);
//         callback(new Error('Not allowed by CORS: ' + origin));
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'token'],
//     credentials: true,
//     optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// // Handle ALL preflight OPTIONS requests BEFORE any route
// app.options('*', cors(corsOptions));

// // ─── Middleware ───────────────────────────────────────────────────────────────
// app.use(express.json());

// // ─── Routes ───────────────────────────────────────────────────────────────────
// app.use('/api/user',            userRouter);
// app.use('/api/product',         productRouter);
// app.use('/api/cart',            cartRouter);
// app.use('/api/order',           orderRouter);
// app.use('/api/recommendations', recommendationRouter);

// app.get('/', (req, res) => res.send('API Working.'));

// app.listen(port, () => console.log(`Server started on PORT ${port}`));














import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import recommendationRouter from './routes/recommendationRoute.js';

const app = express();
const port = process.env.PORT || 5000;   // matches your .env PORT=5000

connectDB();
connectCloudinary();

// ─── Allowed origins ─────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
    'http://localhost:5173',                // frontend local
    'http://localhost:5174',                // admin local
    'http://localhost:5175',                // admin local (alt port)
    process.env.FRONTEND_URL,              // https://forever-website-frontend-amber.vercel.app
    process.env.ADMIN_URL,                 // https://forever-website-admin-coral.vercel.app
].filter(Boolean);

// ─── CORS config ─────────────────────────────────────────────────────────────
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);   // Postman / server-to-server
        if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        console.log('CORS blocked:', origin);
        callback(new Error('Not allowed by CORS: ' + origin));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
    optionsSuccessStatus: 200,
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle ALL preflight OPTIONS requests — must be before routes
app.options('/*', cors(corsOptions));

// ─── Body parser ─────────────────────────────────────────────────────────────
app.use(express.json());

// ─── API routes ──────────────────────────────────────────────────────────────
app.use('/api/user',            userRouter);
app.use('/api/product',         productRouter);
app.use('/api/cart',            cartRouter);
app.use('/api/order',           orderRouter);
app.use('/api/recommendations', recommendationRouter);

app.get('/', (req, res) => res.send('API Working.'));

app.listen(port, () => console.log(`Server started on PORT ${port}`));