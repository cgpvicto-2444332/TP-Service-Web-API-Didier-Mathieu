import express from 'express';
import * as bibliothequeController from '../controllers/bibliotheque.controller.js';
import authentification from '../middlewares/authentification.middleware.js';

const router = express.Router();

router.get('/livre', authentification, bibliothequeController.getListeLivres);
router.get('/livre/:id', authentification, bibliothequeController.getLivreById);
router.post('/livre', authentification, bibliothequeController.ajouterLivre)
router.put('/livre/:id', authentification, bibliothequeController.modifierLivre)
router.delete('/livre/:id', authentification, bibliothequeController.supprimerLivre)
router.post('/pret', authentification, bibliothequeController.ajouterPret)
router.put('/pret/:id', authentification, bibliothequeController.modifierPret)
router.delete('/pret/:id', authentification, bibliothequeController.supprimerPret)

export default router;