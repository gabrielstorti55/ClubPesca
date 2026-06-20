/**
 * Script de migração: fotos em base64 (salvas direto no MongoDB) -> Cloudinary
 *
 * O que ele faz:
 * 1. Busca todas as fotos no banco cuja `url` começa com "data:" (ou seja, base64)
 * 2. Envia cada uma para o Cloudinary
 * 3. Atualiza o registro no banco com a nova URL (do Cloudinary) e o publicId
 *
 * Fotos que já são URLs normais (http/https) são ignoradas - já migradas.
 *
 * Como rodar (de dentro da pasta backend/):
 *   node scripts/migrate-photos-to-cloudinary.js
 *
 * Pré-requisito: o .env já deve ter DATABASE_URL e as credenciais do Cloudinary configuradas.
 */

import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import { cloudinary } from "../src/lib/cloudinary.js";

async function migratePhoto(photo) {
  console.log(`Migrando foto ${photo.id} (business ${photo.businessId})...`);

  const result = await cloudinary.uploader.upload(photo.url, {
    folder: `clubpesca/business/${photo.businessId}`,
    resource_type: "image",
  });

  await prisma.photo.update({
    where: { id: photo.id },
    data: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  console.log(`  -> OK: ${result.secure_url}`);
}

async function main() {
  const todasFotos = await prisma.photo.findMany();

  const fotosBase64 = todasFotos.filter((p) => p.url && p.url.startsWith("data:"));

  console.log(`Total de fotos no banco: ${todasFotos.length}`);
  console.log(`Fotos em base64 a migrar: ${fotosBase64.length}`);

  if (fotosBase64.length === 0) {
    console.log("Nada para migrar. Todas as fotos já estão no Cloudinary (ou não há fotos).");
    return;
  }

  let sucesso = 0;
  let falhas = 0;

  for (const photo of fotosBase64) {
    try {
      await migratePhoto(photo);
      sucesso++;
    } catch (error) {
      falhas++;
      console.error(`  -> ERRO ao migrar foto ${photo.id}:`, error.message);
    }
  }

  console.log("\n--- Migração concluída ---");
  console.log(`Sucesso: ${sucesso}`);
  console.log(`Falhas: ${falhas}`);
}

main()
  .catch((error) => {
    console.error("Erro fatal na migração:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
