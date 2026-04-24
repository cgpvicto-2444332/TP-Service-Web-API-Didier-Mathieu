import pool from "../config/db_pg.js";

/**
 * Ajoute un utilisateur et lui donne une clé d'api pour se connecter au routes.
 * @param {object} utilisateur Les données du nouvel utilisateur.
 */
const _ajouterUtilisateur = async (utilisateur) => {
};

const _validationCle = async (cleApi) => {
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