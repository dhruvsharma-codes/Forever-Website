import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Please Login Again.",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Set on BOTH locations for full compatibility across all controllers
    req.body.userId = token_decode.id;
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid Token. Please Login Again." });
  }
};

export default authUser;
