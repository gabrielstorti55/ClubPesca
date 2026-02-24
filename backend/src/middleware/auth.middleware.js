import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return authHeader.split(" ")[1];
}

export function authenticateToken(req, res, next) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: "Token nao fornecido" });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.userId = user.id;
    return next();
  } catch (_error) {
    return res.status(403).json({ error: "Token invalido" });
  }
}

export function attachUserIfPresent(req, _res, next) {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.userId = user.id;
  } catch (_error) {
    req.userId = undefined;
  }

  return next();
}
