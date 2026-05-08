import * as bibliothequeModele from '../models/bibliotheque.model.js';

export const getListeLivres = async (req, res) => {
    const tousLivres = req.query.tous === 'true';
    const bibliothequeId = req.bibliothequeId;

    try {
        const resultat = await bibliothequeModele._getListeLivres(tousLivres, bibliothequeId);
        return res.status(200).json(resultat);
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        return res.status(500).json({
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
                erreur: `Le livre avec l'id [${idLivre}] n'existe pas pour cette bibliothèque`
            });
        }

        const prets = await bibliothequeModele._getPretsLivreId(idLivre);
        return res.status(200).json({
            titre: livre.titre,
            auteur: livre.auteur,
            isbn: livre.isbn,
            disponible: livre.disponible,
            description: livre.description,
            prets: prets
        });
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        return res.status(500).json({
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
        
        return res.status(201).json({
            message: `Le livre [${nouveauLivre.titre}] a été ajouté avec succès`,
            livre: nouveauLivre
        });
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        return res.status(500).json({
            erreur: `Echec lors de la création du livre [${nouveauLivre.titre}]`
        });
    }
};

export const modifierLivre = async (req, res) => {
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

    const idLivre = req.params.id;
    const bibliothequeId = req.bibliothequeId;
    
    try {
        const livreActuel = await bibliothequeModele._getLivreById(idLivre, req.bibliothequeId);

        if(!livreActuel) {
            return res.status(404).json({
                erreur: `Le livre à l'ID [${idLivre}] n'existe pas pour cette bibliothèque dans la base de données`
            });
        }

        const livreAModifier = {
            id: idLivre,
            bibliotheque_id: bibliothequeId,
            titre: req.body.titre,
            auteur: req.body.auteur,
            isbn: req.body.isbn,
            disponible: req.body.disponible,
            date_ajout: req.body.date_ajout ?? livreActuel.date_ajout,
            description: req.body.description ?? livreActuel.description
        };

        const resultat = await bibliothequeModele._modifierLivre(livreAModifier);

        return res.status(200).json({
            message: `Le livre à l'ID [${livreAModifier.id}] a été modifié avec succès`
        });
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        return res.status(500).json({
            erreur: `Echec lors de la modification du livre [${req.body.titre}]`
        });
    }
};

export const modifierStatusLivre = async (req, res) => {
    const idLivre = req.params.id;
    const bibliothequeId = req.bibliothequeId;
    const status = req.body.disponible;

    if (status !== true && status !== false) {
        return res.status(400).json({
            erreur: "Le champ disponible est invalide"
        });
    }
    
    try {
        const livreActuel = await bibliothequeModele._getLivreById(idLivre, bibliothequeId);

        if(!livreActuel) {
            return res.status(404).json({
                erreur: `Le livre à l'ID [${idLivre}] n'existe pas pour cette bibliothèque dans la base de données`
            });
        }

        const resultat = await bibliothequeModele._modifierStatusLivre(idLivre, bibliothequeId, status);

        return res.status(200).json({
            message: `Le status du libre à l'ID [${idLivre}] a été modifié avec succès`
        });
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        return res.status(500).json({
            erreur: `Echec lors de la modification du status du livre [${idLivre}]`
        });
    }
};

export const supprimerLivre = async (req, res) => {
    const idLivre = req.params.id;
    const bibliothequeId = req.bibliothequeId;

    try {
        const livreActuel = await bibliothequeModele._getLivreById(idLivre, bibliothequeId);

        if(!livreActuel) {
            return res.status(404).json({
                erreur: `Le livre à l'ID [${idLivre}] n'existe pas pour cette bibliothèque dans la base de données`
            });
        }

        await bibliothequeModele._supprimerPretsLivre(idLivre);
        const resultat = await bibliothequeModele._supprimerLivre(idLivre, bibliothequeId);

        return res.status(200).json({
            message: `Le livre avec l'id [${idLivre}] a été supprimé avec succès` 
        });
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} message: ${erreur.message}`);
        return res.status(500).json({
            erreur: `Echec lors de la suppression du livre [${idLivre}]`
        });
    }
};

export const ajouterPret = async (req, res) => {
};

export const modifierPret = async (req, res) => {
};

export const modifierStatusPret = async (req, res) => {
};

export const supprimerPret = async(req, res) => {
};