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
            return res.status(404).json({
                erreur: `Le livre avec l'id ${idLivre} n'existe pas pour cette bibliothèque`
            });
        }

        const prets = await bibliothequeModele._getPretsLivreId(idLivre);
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
            erreur: `Echec lors de la récupération du livre avec l'id ${idLivre}`
        });
    }
};

export const ajouterLivre = async (req, res) => {
    const champsRequis = [
        "titre",
        "auteur",
        "isbn",
        "disponible"
    ];
    
    const champsManquants = [];

    for (let i = 0; i < champsRequis.length; i++) {
        const champ = champsRequis[i];
        if (req.body[champ] === null || req.body[champ] === undefined || req.body[champ] === "") {
            champsManquants.push(champ);
        }
    }
    
    if (champsManquants.length > 0) {
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champs_manquants: champsManquants
        });
    }
    
    const nouveauLivre = {
        id: null,
        bibliotheque_id: req.bibliothequeId,
        titre: req.body.titre,
        auteur: req.body.auteur,
        isbn: req.body.isbn,
        date_ajout: req.body.date_ajout || new Date(),
        disponible: req.body.disponible,
        description: req.body.description
    };
    
    try {
        const resultat = await bibliothequeModele._ajouterLivre(nouveauLivre);

        nouveauLivre.id = resultat.id;
        
        res.status(201).json({
            message: `Le livre [${nouveauLivre.titre}] a été ajouté avec succès`,
            livre: nouveauLivre
        });
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        res.status(500).json({
            erreur: `Echec lors de la création du livre [${nouveauLivre.titre}]`
        });
    }
};

export const modifierLivre = async (req, res) => {
};

export const modifierStatusLivre = async (req, res) => {
};

export const supprimerLivre = async (req, res) => {
};

export const ajouterPret = async (req, res) => {
};

export const modifierPret = async (req, res) => {
};

export const modifierStatusPret = async (req, res) => {
};

export const supprimerPret = async(req, res) => {
};