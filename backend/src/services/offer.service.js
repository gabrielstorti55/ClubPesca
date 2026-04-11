import { prisma } from "../lib/prisma.js";

export async function createOffer(data) {
  return await prisma.offer.create({
    data,
  });
}

export async function getOffersByBusinessId(businessId) {
  return await prisma.offer.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOffer(id, data) {
  return await prisma.offer.update({
    where: { id },
    data,
  });
}

export async function deleteOffer(id) {
  return await prisma.offer.delete({
    where: { id },
  });
}
