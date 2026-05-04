import('./src/lib/prisma.js').then(async ({prisma}) => { const u = await prisma.user.findUnique({where:{email:'gabrielstorti8828@gmail.com'}}); console.log('DB USER:', u); process.exit(0); });
