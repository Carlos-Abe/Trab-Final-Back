// Issue 09

const express = require('express');
const router = express.Router();
const {
    criarFreelancer,
    listarFreelancers,
    obterFreelancer,
    atualizarFreelancer,
    deletarFreelancer
} = require('../controllers/freelancerController');

router.post('/', criarFreelancer);
router.get('/', listarFreelancers);
router.get('/:id', obterFreelancer);
router.put('/:id', atualizarFreelancer);
router.delete('/:id', deletarFreelancer);

module.exports = router;
