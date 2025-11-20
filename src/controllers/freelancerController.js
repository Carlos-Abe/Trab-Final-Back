// Issue 09

const Freelancer = require('../models/freelancerModel');

// Criar novo freelancer
exports.criarFreelancer = async (req, res) => {
  try {
    const { nome, area, disponibilidade, nota } = req.body;
    const freelancer = await Freelancer.create({ nome, area, disponibilidade, nota });
    res.status(201).json(freelancer);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar todos os freelancers
exports.listarFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Obter freelancer por ID
exports.obterFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) return res.status(404).json({ erro: 'Freelancer não encontrado' });
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar freelancer
exports.atualizarFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!freelancer) return res.status(404).json({ erro: 'Freelancer não encontrado' });
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Deletar freelancer
exports.deletarFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
    if (!freelancer) return res.status(404).json({ erro: 'Freelancer não encontrado' });
    res.status(200).json({ mensagem: 'Freelancer deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
