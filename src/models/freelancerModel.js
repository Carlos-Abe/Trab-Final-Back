// Issue 09
const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    minlength: [3, 'O nome deve ter pelo menos 3 caracteres'],
    trim: true
  },
  area: {
    type: String,    
    required: [true, 'A área é obrigatória'],
    trim: true
  },
  disponibilidade: {
    type: String,
    enum: ['disponível', 'indisponível'],
    default: 'disponível'
  },
  nota: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  }
}, { timestamps: true });

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;

