import pool from "../config/db_pg.js";

/**
 * Ajoute un utilisateur et lui donne une clé d'api pour se connecter au routes.
 * @param {object} utilisateur Les données du nouvel utilisateur.
 */
const _ajouterUtilisateur = async (utilisateur) => {
    const requete = "INSERT INTO bibliotheque (nom, courriel, password, cle_api) VALUES ($1, $2, $3, $4)";
    const params = [utilisateur.nom, utilisateur.courriel, utilisateur.password, utilisateur.cle_api];
    
    try {
        const resultat = await pool.query(requete, params);
        return resultat.rows[0] ?? null;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

const _validationCle = async (cleApi) => {
    const requete = "SELECT id, nom, courriel FROM bibliotheque WHERE cle_api = $1";
    const params = [cleApi];

    try {
        const resultats = await pool.query(requete, params);
        if (resultats.rows.length > 0) {
            return resultats.rows[0];
        }
        return null;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

/**
 * Récupère la clé d'api en fonction du courriel d'un utilisateur si le mot de passe et courriel sont valides.
 * @param {string} courriel Le courriel de l'utilisateur à vérifier.
 */
const _recupererUtilisateur = async (courriel) => {
    const requete = "SELECT id, password, cle_api FROM bibliotheque WHERE courriel = $1";
    const params = [courriel];

    try {
        const resultat = await pool.query(requete, params);
        return resultat.rows[0] ?? null;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

/**
 * Génère une nouvelle clé d'api en fonction du id de l'utilisateur
 * @param {string} nouvelleCle La nouvelle clé api à remplacer dans la bdé
 * @param {number} id L'identifiant de l'utilisateur.
 */
const _nouvelleCle = async (nouvelleCle, id) => {
    const requete = "UPDATE bibliotheque SET cle_api = $1 WHERE id = $2";
    const params = [nouvelleCle, id];

    try {
        const resultat = await pool.query(requete, params);
        return resultat.rows[0] ?? null;
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} : ${erreur.message}`);
        throw erreur;
    }
};

export {
    _ajouterUtilisateur,
    _validationCle,
    _recupererUtilisateur,
    _nouvelleCle
}