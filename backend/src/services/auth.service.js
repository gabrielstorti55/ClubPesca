import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function registerUser(data) {
    if (!data.email || !data.name || !data.password) {
        throw new Error('Dados obrigatorios faltando')
    }

    const exists = await prisma.user.findUnique({
        where: { email: data.email }
    })

    if (exists) {
        throw new Error('Email já cadastrado')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(data.password, salt)

    const user = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: hash
        }
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }

}

