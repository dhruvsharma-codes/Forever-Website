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







import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import recommendationRouter from './routes/RecommendationRoute.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

const allowedOrigins = [
  "https://forever-website-frontend-amber.vercel.app",
  "https://forever-website-admin-coral.vercel.app",
];

// MIDDLEWARES
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

// API ENDPOINTS
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/recommendations', recommendationRouter);

app.get('/', (req, res) => {
  res.send("API Working.");
});

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});