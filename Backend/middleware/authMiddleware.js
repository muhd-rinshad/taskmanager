import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "taskmanagersecret123";

const authMiddleware = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);

  try {
    const authHeader = req.headers.authorization;

      console.log("JWT_SECRET:", JWT_SECRET);
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT Error:", err.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;