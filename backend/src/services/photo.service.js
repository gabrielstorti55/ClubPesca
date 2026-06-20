import { prisma } from "../lib/prisma.js";
import { cloudinary } from "../lib/cloudinary.js";
import { HttpError } from "../utils/http-error.js";

const MAX_PHOTOS_PER_BUSINESS = 8;

// Envia o buffer da imagem para o Cloudinary e retorna { url, publicId }
async function uploadToCloudinary(fileBuffer, businessId) {
  const base64 = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: `clubpesca/business/${businessId}`,
    resource_type: "image",
  });

  return { url: result.secure_url, publicId: result.public_id };
}

// Cria uma nova foto na galeria do pesqueiro
export async function uploadPhoto({ file, businessId }) {
  if (!businessId) {
    throw new HttpError(400, "businessId é obrigatório");
  }

  if (!file) {
    throw new HttpError(400, "Nenhum arquivo de imagem enviado");
  }

  const totalFotos = await prisma.photo.count({ where: { businessId } });
  if (totalFotos >= MAX_PHOTOS_PER_BUSINESS) {
    throw new HttpError(400, `Limite de ${MAX_PHOTOS_PER_BUSINESS} fotos por pesqueiro atingido`);
  }

  const { url, publicId } = await uploadToCloudinary(file.buffer, businessId);

  // Se for a primeira foto do pesqueiro, ela já nasce como principal
  const isMain = totalFotos === 0;

  return prisma.photo.create({
    data: {
      url,
      publicId,
      isMain,
      order: totalFotos,
      businessId,
    },
  });
}

// Lista todas as fotos de um pesqueiro (principal primeiro, depois por ordem)
export async function listPhotos(businessId) {
  return prisma.photo.findMany({
    where: { businessId },
    orderBy: [{ isMain: "desc" }, { order: "asc" }, { createdAt: "asc" }],
  });
}

// Define uma foto como principal (e desmarca as outras do mesmo pesqueiro)
export async function setMainPhoto(photoId) {
  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo) {
    throw new HttpError(404, "Foto não encontrada");
  }

  await prisma.photo.updateMany({
    where: { businessId: photo.businessId },
    data: { isMain: false },
  });

  return prisma.photo.update({
    where: { id: photoId },
    data: { isMain: true },
  });
}

// Deleta uma foto do banco e do Cloudinary
export async function deletePhoto(photoId) {
  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo) {
    throw new HttpError(404, "Foto não encontrada");
  }

  if (photo.publicId) {
    try {
      await cloudinary.uploader.destroy(photo.publicId);
    } catch (error) {
      // Não bloqueia a exclusão no banco se o Cloudinary falhar
      // (ex: imagem já removida manualmente lá)
      console.error("Erro ao remover imagem do Cloudinary:", error.message);
    }
  }

  const wasMain = photo.isMain;
  await prisma.photo.delete({ where: { id: photoId } });

  // Se a foto deletada era a principal, promove a próxima da fila
  if (wasMain) {
    const nextPhoto = await prisma.photo.findFirst({
      where: { businessId: photo.businessId },
      orderBy: { order: "asc" },
    });

    if (nextPhoto) {
      await prisma.photo.update({
        where: { id: nextPhoto.id },
        data: { isMain: true },
      });
    }
  }

  return { id: photoId, deleted: true };
}
