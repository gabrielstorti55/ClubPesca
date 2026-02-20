import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createAddressService(data) {
  return await prisma.address.create({ data });
}

export async function getAddressesService() {
  return await prisma.address.findMany();
}

export async function getAddressByIdService(id) {
  return await prisma.address.findUnique({ where: { id } });
}
