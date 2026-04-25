import express from 'express';
import * as utilisateursController from '../controllers/utilisateur.controller.js';

const router = express.Router();

router.post('/', utilisateursController.ajouterUtilisateur);
router.get('/cle', utilisateursController.recupererCle);

export default router;