import { prisma } from "../lib/prisma.js";

export async function createBusiness(data) {
  return await prisma.business.create({
    data,
  });
}


export async function getAllBusinesses() {
  return await prisma.business.findMany({
    include: {
      address: true,
      photos: true,
      type: true,
      offers: {
        where: { active: true },
        orderBy: { createdAt: "desc" },
      },
      fishes: {
        include: {
          fish: true,
        },
      },
    }
  });
}

export async function getBusinessesByUserId(userId) {
  return await prisma.business.findMany({
    where: { ownerId: userId },
    include: {
      address: true,
      photos: true,
      type: true,
      offers: {
        orderBy: { createdAt: "desc" },
      },
      fishes: {
        include: {
          fish: true,
        },
      },
    }
  });
}

export async function getBusinessesById(id) {
  return await prisma.business.findUnique({
    where: {id}
  })
}

export async function updateBusinesses(id, data) {
  return await prisma.business.update({
    where: { id },
    data,
  })
}

export async function deleteBusinesses(id) {
  return await prisma.business.delete({
    where: { id }
  })
}
