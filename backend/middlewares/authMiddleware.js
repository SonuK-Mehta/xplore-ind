import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.user = { userId: payload.userId }; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default userAuth;
