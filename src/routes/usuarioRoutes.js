const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const autenticarToken = require('../middlewares/authMiddleware');

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verifica se usuário existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        // Verifica senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        // Gera token JWT
        const token = jwt.sign(
            { id: usuario._id, nome: usuario.nome },
            process.env.JWT_SECRET || 'segredo',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, usuario: { _id: usuario._id, nome: usuario.nome, email: usuario.email } });

    } catch (err) {
        res.status(500).json({ erro: 'Erro interno do servidor', detalhes: err.message });
    }
});

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-senha');
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ 
            erro: 'Erro ao listar usuários',
            detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Rota para obter usuário por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-senha');
        
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        
        res.status(200).json(usuario);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        res.status(500).json({ 
            erro: 'Erro ao buscar usuário',
            detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Rota para criar novo usuário
router.post('/', async (req, res) => {
    try {

        const { nome, email, senha, perfil } = req.body;

        // Validação dos campos obrigatórios
        if (!nome || !email || !senha || !perfil) {
        return res.status(400).json({ 
            erro: 'Todos os campos são obrigatórios: nome, email, senha, perfil' 
        });
        };

        const novoUsuario = new Usuario({ 
            nome,
            email,
            senha, // Será criptografada automaticamente
            perfil
        });        

        const usuarioSalvo = await novoUsuario.save();
        res.status(201).json({ 
            mensagem: 'Usuário criado com sucesso',
            usuario: usuarioSalvo//
        });

    } catch (err) {
       if (err.code === 11000)  {
            return res.status(400).json({ erro: 'E-mail já cadastrado' })
       }

       if (err.name === 'ValidationError') {
            const erros = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ erro: erros });
        }

        res.status(500).json({ 
            erro: 'Erro interno do servidor',
            detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
         })
    };
});

// Rota para atualizar usuário por ID
router.put('/:id', async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        // Validação mínima (opcional, você pode ajustar)
        if (!nome && !email && !senha && !perfil) {
            return res.status(400).json({ erro: 'É necessário fornecer pelo menos um campo para atualizar' });
        }

        // Busca o usuário pelo ID
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        // Atualiza os campos se fornecidos
        if (nome) usuario.nome = nome;
        if (email) usuario.email = email;
        if (perfil) usuario.perfil = perfil;
        if (senha) {
            const bcrypt = require('bcrypt');
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(senha, salt);
        }

        const usuarioAtualizado = await usuario.save();

        // Retorna o usuário atualizado sem a senha
        const { senha: _, ...usuarioSemSenha } = usuarioAtualizado.toObject();

        res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso',
            usuario: usuarioSemSenha
        });

    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        if (err.code === 11000) {
            return res.status(400).json({ erro: 'E-mail já cadastrado' });
        }
        res.status(500).json({
            erro: 'Erro ao atualizar usuário',
            detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Rota para deletar usuário por ID
router.delete('/:id', autenticarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });

    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        res.status(500).json({ 
            erro: 'Erro ao deletar usuário',
            detalhes: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

module.exports = router;