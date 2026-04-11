import { prisma } from "../lib/prisma.js";

// CRUD de peixes (catálogo geral)
export async function createFish(data) {
  return await prisma.fish.create({
    data,
  });
}

export async function getAllFish() {
  return await prisma.fish.findMany({
    orderBy: { name: "asc" },
  });
}

export async function updateFish(id, data) {
  return await prisma.fish.update({
    where: { id },
    data,
  });
}

export async function deleteFish(id) {
  return await prisma.fish.delete({
    where: { id },
  });
}

// Associação de peixes a negócios
export async function addFishToBusiness(businessId, fishId) {
  // Verifica se já existe
  const existing = await prisma.businessFish.findFirst({
    where: {
      businessId,
      fishId,
    },
  });

  if (existing) {
    throw new Error("Este peixe já está associado a este negócio");
  }

  return await prisma.businessFish.create({
    data: {
      businessId,
      fishId,
    },
    include: {
      fish: true,
    },
  });
}

export async function getFishesByBusinessId(businessId) {
  return await prisma.businessFish.findMany({
    where: { businessId },
    include: {
      fish: true,
    },
  });
}

export async function removeFishFromBusiness(businessFishId) {
  return await prisma.businessFish.delete({
    where: { id: businessFishId },
  });
}
