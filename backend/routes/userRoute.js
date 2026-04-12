// import express from "express"
// import { LoginUser, registerUser, adminLogin,changePassword } from "../controllers/userController.js"
// import authUser from "../middleware/auth.js";

// const userRouter = express.Router();


// userRouter.post('/register', registerUser);
// userRouter.post('/login', LoginUser);
// userRouter.post('/admin', adminLogin);
// userRouter.post('/change-password', authUser, changePassword);  // ← NEW (protected)



// export default userRouter




import express from "express"
import { LoginUser, registerUser, adminLogin, changePassword, getUserProfile } from "../controllers/userController.js"
import authUser from "../middleware/auth.js"

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', LoginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/change-password', authUser, changePassword);   // protected
userRouter.post('/profile', authUser, getUserProfile);           // protected — fetch real profile data

export default userRouter;