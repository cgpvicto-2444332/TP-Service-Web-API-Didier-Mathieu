import pool from "../config/db_pg.js";

/**
 * Récupère tout les livres dans la base de donnée
 * @param {boolean} tousLivres Si vrai, retourne tous les livres, sinon retourne seulement les livres disponibles
 */
const _getListeLivres = async (tousLivres) => {
};

/**
 * Récupère toutes les détails d'un livre en fonction de son identifiant.
 * @param {number} id L'identifiant du livre.
 */
const _getLivreById = async (id) => {
};

/**
 * Insère un livre dans la base de donnée.
 * @param {object} livre Les données du livre à ajouter.
 */
const _ajouterLivre = async (livre) => {
};

/**
 * Modifie les données d'un livre en fonction de son identifiant.
 * @param {number} id L'identifiant du livre à modifier.
 * @param {object} livre Les données du livre à modifier.
 */
const _modifierLivre = async (id, livre) => {
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

/**
 * Ajoute un utilisateur et lui donne une clé d'api pour se connecter au routes.
 * @param {object} utilisateur Les données du nouvel utilisateur.
 */
const _ajouterUtilisateur = async (utilisateur) => {
};

/**
 * Récupère la clé d'api en fonction du courriel d'un utilisateur si le mot de passe et courriel sont valides.
 * @param {string} courriel Le courriel de l'utilisateur à vérifier.
 */
const _recupererUtilisateur = async (courriel) => {
};

/**
 * Génère une nouvelle clé d'api en fonction du id de l'utilisateur
 * @param {string} nouvelleCle La nouvelle clé api à remplacer dans la bdé
 * @param {number} id L'identifiant de l'utilisateur.
 */
const _nouvelleCle = async (nouvelleCle, id) => {
};