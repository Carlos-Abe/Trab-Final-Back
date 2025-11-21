require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // ALTERAÇÃO: bcryptjs
const Usuario = require('../models/usuarioModel');

async function registrar(req, res) {
  try {
    const { nome, email, senha, perfil } = req.body;

    // Validações básicas
    if (!nome || !email || !senha || !perfil) {
      return res.status(400).json({ 
        erro: 'Todos os campos são obrigatórios: nome, email, senha, perfil' 
      });
    }

    // Verifica se já existe um usuário com esse email
    const emailExistente = await Usuario.findOne({ email });
    if (emailExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // Valida se o perfil é válido
    if (!['freelancer', 'empresa'].includes(perfil)) {
      return res.status(400).json({ 
        erro: 'Perfil deve ser "freelancer" ou "empresa"' 
      });
    }

    // Não criptografa a senha aqui! O model faz isso (pre-save) // ALTERAÇÃO
    const novoUsuario = await Usuario.create({ 
      nome, 
      email, 
      senha, // ALTERAÇÃO: senha normal, o model faz hash
      perfil 
    });

    // Gera token JWT
    const token = jwt.sign({ 
      id: novoUsuario._id, 
      perfil: novoUsuario.perfil 
    }, process.env.JWT_SECRET, { 
      expiresIn: '1d' 
    });

    // Retorna os dados do usuário (o toJSON() do modelo já remove a senha)
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token,
      usuario: novoUsuario
    });

  } catch (err) {
    // Captura erros de validação do Mongoose
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ 
        erro: 'Dados inválidos', 
        detalhes: errors 
      });
    }
    
    // Erro de duplicidade de email
    if (err.code === 11000) {
      return res.status(400).json({ 
        erro: 'Email já cadastrado' 
      });
    }

    res.status(500).json({ 
      erro: 'Erro interno ao registrar usuário', 
      detalhes: err.message 
    });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    // Validações básicas
    if (!email || !senha) {
      return res.status(400).json({ 
        erro: 'Email e senha são obrigatórios' 
      });
    }

    // Busca usuário **normal**, senha já vem (não usar .select) // ALTERAÇÃO
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
      return res.status(404).json({ 
        erro: 'Usuário não encontrado' 
      });
    }

    // Log para depuração (opcional) // ALTERAÇÃO
    // console.log('Senha digitada:', senha);
    // console.log('Hash no banco:', usuario.senha);

    // Usa o método do modelo para comparar senhas
    const senhaValida = await usuario.compararSenha(senha);
    
    if (!senhaValida) {
      return res.status(401).json({ 
        erro: 'Senha inválida' 
      });
    }

    // Gera token JWT
    const token = jwt.sign({ 
      id: usuario._id, 
      perfil: usuario.perfil 
    }, process.env.JWT_SECRET, { 
      expiresIn: '1d' 
    });

    // Retorna o usuário sem a senha (o toJSON do model já remove)
    res.json({ 
      message: 'Login realizado com sucesso',
      token,
      usuario
    });

  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ 
      erro: 'Erro interno ao fazer login', 
      detalhes: err.message 
    });
  }
}

module.exports = { registrar, login };
