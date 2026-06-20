import { prisma } from "../lib/prisma.js";
import { HttpError } from "./http-error.js";

/**
 * Verifica se o usuário autenticado é o DONO do pesqueiro (business) ou um ADMIN.
 * Lança HttpError 403 se não for, ou 404 se o pesqueiro não existir.
 *
 * Use isso em qualquer ação que modifica/deleta algo pertencente a um business
 * (o próprio business, suas fotos, ofertas, etc.)
 */
export async function assertOwnerOrAdmin(userId, businessId) {
  const [user, business] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.business.findUnique({ where: { id: businessId } }),
  ]);

  if (!business) {
    throw new HttpError(404, "Pesqueiro não encontrado.");
  }

  if (!user) {
    throw new HttpError(401, "Usuário não encontrado.");
  }

  const isOwner = business.ownerId === userId;
  const isAdmin = user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new HttpError(403, "Você não tem permissão para modificar este pesqueiro.");
  }

  return business;
}

/**
 * Verifica se o usuário autenticado é o DONO da oferta (através do pesqueiro dela) ou um ADMIN.
 * Retorna a oferta encontrada se autorizado.
 */
export async function assertOfferOwnerOrAdmin(userId, offerId) {
  const offer = await prisma.offer.findUnique({ where: { id: offerId } });

  if (!offer) {
    throw new HttpError(404, "Oferta não encontrada.");
  }

  await assertOwnerOrAdmin(userId, offer.businessId);
  return offer;
}

/**
 * Verifica se o usuário autenticado é o DONO da foto (através do pesqueiro dela) ou um ADMIN.
 * Retorna a foto encontrada se autorizado.
 */
export async function assertPhotoOwnerOrAdmin(userId, photoId) {
  const photo = await prisma.photo.findUnique({ where: { id: photoId } });

  if (!photo) {
    throw new HttpError(404, "Foto não encontrada.");
  }

  await assertOwnerOrAdmin(userId, photo.businessId);
  return photo;
}
