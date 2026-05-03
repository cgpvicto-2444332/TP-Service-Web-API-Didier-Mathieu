import pool from "../config/db_pg.js";

/**
 * Récupère tout les livres dans la base de donnée
 * @param {boolean} tousLivres Si vrai, retourne tous les livres, sinon retourne seulement les livres disponibles
 */
const _getListeLivres = async (tousLivres, bibliothequeId) => {
    let requete = "SELECT * FROM livres WHERE bibliotheque_id = $1";
    const params = [bibliothequeId];
    
    if (!tousLivres) {
        requete += " AND disponible = $2";
        params.push(true);
    }

    try {
        const livres = await pool.query(requete, params);
        return livres.rows;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

/**
 * Récupère toutes les détails d'un livre en fonction de son identifiant.
 * @param {number} id L'identifiant du livre.
 */
const _getLivreById = async (id, bibliothequeId) => {
    const requete = "SELECT bibliotheque_id, titre, auteur, isbn, disponible, description FROM public.livres WHERE id = $1 AND bibliotheque_id = $2;";
    const params = [id, bibliothequeId];

    try {
        const livre = await pool.query(requete, params);
        return livre.rows[0];
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

/**
 * Récupère tout les prêts d'un livre en fonction de son identifiant.
 * @param {number} idLivre L'identifiant du livre.
 * @returns La liste des prêts avec un champ suplémentaire pour si il est terminé ou non.
 */
const _getPretsLivreId = async (idLivre) => {
    const requete = "SELECT id, livre_id, emprunteur, date_debut, date_retour_prevue, date_retour, CASE WHEN status THEN 'Retourné' ELSE 'En cours' END AS statut_pret FROM public.prets WHERE livre_id = $1;";
    const params = [idLivre];

    try {
        const prets = await pool.query(requete, params);
        return prets.rows;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

/**
 * Insère un livre dans la base de donnée.
 * @param {object} livre Les données du livre à ajouter.
 */
const _ajouterLivre = async (livre) => {
    const requete = "INSERT INTO livres (bibliotheque_id, titre, auteur, isbn, date_ajout, disponible, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id"
    const params = [livre.bibliotheque_id, livre.titre, livre.auteur, livre.isbn, livre.date_ajout, livre.disponible, livre.description];

    try {
        const resultats = await pool.query(requete, params);
        return resultats.rows[0] ?? null;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

/**
 * Modifie les données d'un livre en fonction de son identifiant.
 * @param {number} id L'identifiant du livre à modifier.
 * @param {object} livre Les données du livre à modifier.
 */
const _modifierLivre = async (id, livre) => {
    const requete = "UPDATE livres SET titre = $1, auteur = $2, isbn = $3, date_ajout = $4, disponible = $5, description = $6 WHERE id = $7 AND bibliotheque_id = $8 RETURNING *"
    const params = [livre.titre, livre.auteur, livre.isbn, livre.date_ajout, livre.disponible, livre.description, id, livre.bibliotheque_id];

    try {
        const resultats = await pool.query(requete, params);
        return resultats.rows[0] ?? null;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

/**
 * Modifie le status d'un livre en fonction de son identifiant.
 * @param {number} id L'identifiant du livre à modifier.
 * @param {string} status Le status du livre à modifier.
 */
const _modifierStatusLivre = async (id, status) => {
};

/**
 * Supprime un livre en fonction de son identifiant.
 * @param {number} id id L'identifiant du livre à supprimer.
 */
const _supprimerLivre = async (id) => {
};

/**
 * Insère un prêt dans la base de donnée.
 * @param {object} pret Les données du prêt à ajouter.
 */
const _ajouterPret = async (pret) => {
};

/**
 * Modifie les données d'un prêt en fonction de son identifiant.
 * @param {number} id L'identifiant du prêt à modifier.
 * @param {object} pret Les données du prêt à modifier.
 */
const _modifierPret = async (id, pret) => {
};

/**
 * Modifie le status d'un prêt en fonction de son identifiant.
 * @param {number} id L'identifiant du prêt à modifier.
 * @param {string} status Le status du prêt à modifier.
 */
const _modifierStatusPret = async (id, status) => {
};

/**
 * Supprime un prêt en fonction de son identifiant.
 * @param {number} id id L'identifiant du prêt à supprimer.
 */
const _supprimerPret = async (id) => {
};

export {
    _getListeLivres,
    _getLivreById,
    _getPretsLivreId,
    _ajouterLivre,
    _modifierLivre,
    _supprimerLivre,
    _ajouterPret,
    _modifierPret,
    _supprimerPret
};