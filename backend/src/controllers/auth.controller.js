import { loginUser, registerUser } from '../services/auth.service.js'

export async function register(req, res) {
  try {
    const user = await registerUser(req.body)

    return res.status(201).json(user)

  } catch (err) {
    return res.status(400).json({
      error: err.message
    })
  }
}


export async function login(req, res) {
    try{
        const entrar = await loginUser (req.body)

        return res.status(200).json(entrar)
    }catch(err){
        return res.status(400).json({error: err.message})
    }
}