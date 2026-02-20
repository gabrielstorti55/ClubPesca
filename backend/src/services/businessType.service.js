import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createBusinessTypeService(data) {
  return await prisma.businessType.create({ data });
}

export async function getBusinessTypesService() {
  return await prisma.businessType.findMany();
}
