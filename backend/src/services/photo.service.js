import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Cria uma nova foto para o pesqueiro
export async function uploadPhoto({ url, businessId }) {
	// Remove todas as fotos anteriores desse pesqueiro
	await prisma.photo.deleteMany({ where: { businessId } });
	return prisma.photo.create({
		data: {
			url,
			businessId
		}
	});
}

// Lista todas as fotos de um pesqueiro
export async function listPhotos(businessId) {
	return prisma.photo.findMany({
		where: { businessId },
		orderBy: { createdAt: 'desc' }
	});
}

// Define uma foto como principal
// Não é mais necessário setar foto principal

// Deleta uma foto
export async function deletePhoto(photoId) {
	return prisma.photo.delete({
		where: { id: photoId }
	});
}