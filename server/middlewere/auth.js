import jwt from "jsonwebtoken";

function auth(req, res, next) {
  try {

    const header = req.headers.token;

    if (!header) {
      return res.status(400).json({ message: "Token missing" });
    }

    const token = header.split(" ")[1];

    const decode = jwt.verify(token, process.env.secret_key);

    req.user = decode;

    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default auth;