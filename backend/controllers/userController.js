import userModel from '../models/userModel.js'
import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Route for user login
const LoginUser = async(req,res)=>{

    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
        return res.json({success:false,message:"User Doesn't Exists."});
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(comparePassword){
const token = createToken(user._id);
res.json({success:true,token});
        }

        else{
            res.json({success:false,message:"Invalid Credentials."})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY);
}

// Route for user register
const registerUser = async(req,res)=>{
try {
    const {name,email,password} = req.body;

    // checking user already exists or not
    const checkingUser = await userModel.findOne({email});
    if(checkingUser){
        return res.json({success:false,message:"User Already Exists."});
    }
    
    // validating email format and strong password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter a Valid Email."});
    }

    if(password.length < 8){
        return res.json({success:false,message:"Please Enter strong Password."});
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new userModel({
        name,
        email,
        password:hashedPassword
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({success:true,token})


} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
}
}


// Route for admin login
const adminLogin = async(req,res)=>{
try {
    const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        // const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY);
        const token = jwt.sign(
  { role: "admin" },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1d" }
);
        res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"Invalid Credentials"})
    }

} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
}
}


export { LoginUser, registerUser, adminLogin }




