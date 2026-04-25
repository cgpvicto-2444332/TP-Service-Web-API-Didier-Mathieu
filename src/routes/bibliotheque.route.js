import express from 'express';
import * as bibliothequeController from '../controllers/bibliotheque.controller.js';
import authentification from '../middlewares/authentification.middleware.js';

const router = express.Router();

router.get('/liste', authentification, bibliothequeController.getListeLivres);
router.get('/:id', bibliothequeController.getLivreById);
router.post(':id', bibliothequeController.ajouterLivre)
router.put(':id', bibliothequeController.modifierLivre)
router.delete(':id', bibliothequeController.supprimerLivre)
router.post(':id', bibliothequeController.ajouterPret)
router.put(':id', bibliothequeController.modifierPret)
router.delete(':id', bibliothequeController.supprimerPret)

export default router;