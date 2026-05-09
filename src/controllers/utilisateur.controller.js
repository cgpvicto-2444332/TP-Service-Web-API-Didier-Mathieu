import * as utilisateursModel from '../models/utilisateur.model.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const ajouterUtilisateur = async (req, res) => {
    const champsRequis = [
        "nom",
        "courriel",
        "password"
    ];
    
    const champsManquants = [];

    for (let i = 0; i < champsRequis.length; i++) {
        const champ = champsRequis[i];
        if (req.body[champ] === null || req.body[champ] === "" || req.body[champ] === undefined) {
            champsManquants.push(champ);
        }
    }
    
    if (champsManquants.length > 0) {
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champs_manquants: champsManquants
        });
    }

    const cleApi = crypto.randomUUID();
    const motDePasseHashe = await bcrypt.hash(req.body.password, 10);
    
    const nouvelUtilisateur = {
        nom: req.body.nom,
        courriel: req.body.courriel,
        password: motDePasseHashe,
        cle_api: cleApi
    };
    
    try {
        await utilisateursModel._ajouterUtilisateur(nouvelUtilisateur);
        
        res.status(201).json({
            message: `La bibliothèque a été créé avec succès`,
            cle_api: nouvelUtilisateur.cle_api
        });
    } catch (erreur) {
        res.status(500);
        res.send({
            erreur: `Echec lors de la création de la bibliothèque [${nouvelUtilisateur.nom}]`
        });
        return;
    }
};

export const recupererCle = async (req, res) => {
    if (!req.body.courriel || !req.body.password) {
        return res.status(400).json({ 
            erreur: "Vous devez fournir un courriel et un mot de passe" 
        });
    }

    try {
        const utilisateur = await utilisateursModel._recupererUtilisateur(req.body.courriel);

        if (!utilisateur) {
            return res.status(401).json({
                erreur: "La bibliothèque n'existe pas" 
            });
        }

        const motDePasseValide = await bcrypt.compare(req.body.password, utilisateur.password);

        if (!motDePasseValide) {
            return res.status(401).json({ 
                erreur: "Mot de passe invalide" 
            });
        }

        if (req.query.nouvelle === '1') {
            const nouvelleCle = crypto.randomUUID();
            await utilisateursModel._nouvelleCle(nouvelleCle, utilisateur.id);
            return res.status(200).json({ 
                cle_api: nouvelleCle 
            });
        }

        return res.status(200).json({ 
            cle_api: utilisateur.cle_api 
        });

    } catch (erreur) {
        return res.status(500).json({ 
            erreur: "Erreur lors de la récupération de la clé" 
        });
    }
};