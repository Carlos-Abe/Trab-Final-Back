const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // ALTERAÇÃO: bcryptjs

const usuarioSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [3, 'Nome deve ter pelo menos 3 caracteres'],
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  email: { 
    type: String, 
    required: [true, 'E-mail é obrigatório'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, informe um e-mail válido']
  },
  senha: { 
    type: String, 
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
    select: true // ALTERAÇÃO: garante que senha seja retornada quando necessário
  },
  perfil: { 
    type: String, 
    enum: ['freelancer', 'empresa'], 
    required: [true, 'Perfil é obrigatório'] 
  }
}, {
  timestamps: true
});

// Antes de salvar, criptografa a senha
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  try {
    const salt = await bcrypt.genSalt(10); // ALTERAÇÃO: bcryptjs
    this.senha = await bcrypt.hash(this.senha, salt); // ALTERAÇÃO: bcryptjs
    next();
  } catch (err) {
    next(err);
  }
});

// Antes de atualizar com findOneAndUpdate, criptografa a senha se houver
usuarioSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  if (update.senha) {
    try {
      const salt = await bcrypt.genSalt(10); // ALTERAÇÃO: bcryptjs
      update.senha = await bcrypt.hash(update.senha, salt); // ALTERAÇÃO: bcryptjs
      this.setUpdate(update);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Método para comparar senhas (login)
usuarioSchema.methods.compararSenha = async function(senhaDigitada) {
  try {
    return await bcrypt.compare(senhaDigitada, this.senha); // ALTERAÇÃO: bcryptjs
  } catch (error) {
    throw new Error('Erro ao comparar senhas');
  }
};

// Remove a senha do JSON de retorno
usuarioSchema.methods.toJSON = function() {
  const usuario = this.toObject();
  delete usuario.senha;
  return usuario;
};

// Índices para melhorar performance
usuarioSchema.index({ perfil: 1 });

module.exports = mongoose.model('Usuario', usuarioSchema);
