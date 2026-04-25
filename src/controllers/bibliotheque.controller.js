import * as bibliothequeModele from '../models/bibliotheque.model.js';

export const getListeLivres = async (req, res) => {
    const tousLivres = req.query.tous === 'true';

    try {
        const resultat = await bibliothequeModele._getListeLivres(tousLivres);
        res.status(200).json(resultat);
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        res.status(500).json({
            erreur: "Echec lors de la récupération de la liste des livres"
        });
    }
};

export const getLivreById = async (req, res) => {
};

export const ajouterLivre = async (req, res) => {
};

export const modifierLivre = async (req, res) => {
};

export const supprimerLivre = async (req, res) => {
};

export const ajouterPret = async (req, res) => {
};

export const modifierPret = async (req, res) => {
};

export const supprimerPret = async(req, res) => {
};