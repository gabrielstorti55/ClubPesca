import { prisma } from "../lib/prisma.js";

export async function createReview(data) {
  return await prisma.review.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function getReviewsByBusinessId(businessId) {
  return await prisma.review.findMany({
    where: { businessId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateReview(id, userId, data) {
  // Verifica se a review pertence ao usuário
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review || review.userId !== userId) {
    throw new Error("Review não encontrada ou você não tem permissão");
  }

  return await prisma.review.update({
    where: { id },
    data,
  });
}

export async function deleteReview(id, userId) {
  // Verifica se a review pertence ao usuário
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review || review.userId !== userId) {
    throw new Error("Review não encontrada ou você não tem permissão");
  }

  return await prisma.review.delete({
    where: { id },
  });
}

export async function getAverageRating(businessId) {
  const result = await prisma.review.aggregate({
    where: { businessId },
    _avg: {
      rating: true,
    },
    _count: true,
  });

  return {
    averageRating: result._avg.rating || 0,
    totalReviews: result._count,
  };
}
