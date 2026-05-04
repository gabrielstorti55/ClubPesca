import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../utils/http-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import { getUserById } from '../services/auth.service.js';

const router = express.Router();

// Verifica se é ADMIN
const requireAdmin = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);
    if (!user || user.role !== 'ADMIN') {
      throw new HttpError(403, "Acesso negado. Apenas administradores podem realizar esta ação.");
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Obter todos os usuários com suas roles
router.get('/', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    },
    orderBy: {
      name: 'asc'
    }
  });
  return res.json(users);
}));

// Mudar a role de um usuário
router.patch('/:id/role', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['USER', 'OWNER', 'ADMIN'].includes(role)) {
    throw new HttpError(400, "Role inválida.");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true }
  });

  return res.json(updatedUser);
}));

export default router;