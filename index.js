import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import bibliothequeRouter from './src/routes/bibliotheque.route.js';
import utilisateurRouter from './src/routes/utilisateur.route.js';

const swaggerDocument = JSON.parse(fs.readFileSync('./src/config/documentation.json', 'utf8'));

dotenv.config();

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Bibliotheque API"
};

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.use('/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, swaggerOptions));

app.get('/api', (req, res) => {
    res.json({ message: "Bienvenue à l'API de prêts de bibliothèque!" });
});

app.use('/api/bibliotheque', bibliothequeRouter);
app.use('/api/users', utilisateurRouter);

app.listen(port, () => {
    console.log(`Serveur démarré sur l'adresse http://localhost:${port}`);
});