import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createBusiness(data) {
  return await prisma.business.create({
    data,
  });
}


export async function getAllBusinesses() {
  return await prisma.business.findMany({
    include: {
      address: true,
      photos: true
    }
  });
}

export async function getBusinessesByUserId(userId) {
  return await prisma.business.findMany({
    where: { ownerId: userId },
    include: {
      address: true,
      photos: true
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