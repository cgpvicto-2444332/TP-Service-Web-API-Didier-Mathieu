import express from 'express';
import * as bibliothequeController from '../controllers/bibliotheque.controller.js';
import authentification from '../middlewares/authentification.middleware.js';

const router = express.Router();

router.get('/liste', authentification, bibliothequeController.getListeLivres);
router.get('/livre/:id', authentification, bibliothequeController.getLivreById);
router.post('/livre/:id', bibliothequeController.ajouterLivre)
router.put('/livre/:id', bibliothequeController.modifierLivre)
router.delete('/livre/:id', bibliothequeController.supprimerLivre)
router.post('/pret/:id', bibliothequeController.ajouterPret)
router.put('/pret/:id', bibliothequeController.modifierPret)
router.delete('/pret/:id', bibliothequeController.supprimerPret)

export default router;