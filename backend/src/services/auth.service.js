import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET

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

export async function loginUser({email, password}) {
    const foundEmail = await prisma.user.findUnique({
        where: {email}
    })

    if(!foundEmail){
        throw Error("Credenciais invalidas")
    }

    const senhaOk= await bcrypt.compare(password, foundEmail.password)

    if(!senhaOk){
        throw Error("Credenciais invalidas")
    }

    const token = jwt.sign({id: foundEmail.id}, JWT_SECRET, {expiresIn: '1d'})

    return{
        id: foundEmail.id,
        name: foundEmail.name,
        email: foundEmail.email,
        token
    }

}

