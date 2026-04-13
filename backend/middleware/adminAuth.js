import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // ✅ Check if token has role: "admin"
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default adminAuth;
