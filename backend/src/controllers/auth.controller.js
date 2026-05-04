import { getUserById, loginUser, registerUser } from "../services/auth.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const logout = (_req, res) => {
  return res.status(200).json({ message: "Logout realizado com sucesso" });
};

export const register = asyncHandler(async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const authPayload = await loginUser(req.body);
    return res.status(200).json(authPayload);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const me = asyncHandler(async (req, res) => {
  const user = await getUserById(req.userId);
  if (!user) {
    throw new HttpError(404, "Usuario nao encontrado");
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});
