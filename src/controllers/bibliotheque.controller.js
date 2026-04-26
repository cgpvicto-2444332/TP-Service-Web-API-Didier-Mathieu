import * as bibliothequeModele from '../models/bibliotheque.model.js';

export const getListeLivres = async (req, res) => {
    const tousLivres = req.query.tous === 'true';
    const bibliothequeId = req.bibliothequeId;

    try {
        const resultat = await bibliothequeModele._getListeLivres(tousLivres, bibliothequeId);
        res.status(200).json(resultat);
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        res.status(500).json({
            erreur: "Echec lors de la récupération de la liste des livres"
        });
    }
};

export const getLivreById = async (req, res) => {
    const idLivre = req.params.id;
    const bibliothequeId = req.bibliothequeId;

    try {
        const livre = await bibliothequeModele._getLivreById(idLivre, bibliothequeId);

        if (!livre) {
            res.status(404).json({
                erreur: `Le livre avec l'id ${idLivre} n'existe pas pour cette bibliothèque`
            });
        }

        const prets = await bibliothequeModele._getPretsLivreId(idLivre)
        res.status(200).json({
            titre: livre.titre,
            auteur: livre.auteur,
            isbn: livre.isbn,
            disponible: livre.disponible,
            description: livre.description,
            prets: prets
        });
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        res.status(500).json({
            erreur: `Echec lors du livre avec l'id ${idLivre}`
        });
    }
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