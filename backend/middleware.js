import "dotenv/config";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;


function authMiddleware(req, res, next) {
  // const header = req.headers.authorization;
  const header = req.headers.token;
  // console.log(header);

  if (!header || !header.startsWith("Bearer ")) {
    res.status(403).json({
      message: "Invalid token",
    });
  } else {
    const token = header.split(" ")[1];
    console.log(token);

    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (decoded) {
        console.log("decoded is " + decoded);
        console.log("inside try");
        req.userId = decoded; // we did this so that for next functions we can get the userId passed down through headers
        console.log("userId in middleware " + req.userId);

        return next();
      }
    } catch (e) {
      res.status(404).json({
        message: "token not verified",
        result: false
      })
      // console.log(e);
    }
  }
}

export { authMiddleware };
