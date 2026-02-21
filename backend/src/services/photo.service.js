import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Cria uma nova foto para o pesqueiro
export async function uploadPhoto({ url, businessId, isMain = false, order = null }) {
	if (isMain) {
		await prisma.photo.updateMany({
			where: { businessId },
			data: { isMain: false }
		});
	}
	return prisma.photo.create({
		data: {
			url,
			businessId,
			isMain,
			order
		}
	});
}

// Lista todas as fotos de um pesqueiro
export async function listPhotos(businessId) {
	return prisma.photo.findMany({
		where: { businessId },
		orderBy: [{ isMain: 'desc' }, { order: 'asc' }]
	});
}

// Define uma foto como principal
export async function setMainPhoto(photoId, businessId) {
	await prisma.photo.updateMany({
		where: { businessId },
		data: { isMain: false }
	});
	return prisma.photo.update({
		where: { id: photoId },
		data: { isMain: true }
	});
}

// Deleta uma foto
export async function deletePhoto(photoId) {
	return prisma.photo.delete({
		where: { id: photoId }
	});
}