import { loginUser, registerUser, getUserById } from '../services/auth.service.js'
// Logout apenas "invalida" o token no front, mas pode ser usado para limpar cookies se necessário
export function logout(req, res) {
  // Se usar cookies, limpar aqui: res.clearCookie('token');
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
}

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

export async function me(req, res) {
  try {
    const user = await getUserById(req.userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
}