import { registerUser } from '../services/auth.service.js'

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
