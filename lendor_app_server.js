const express = require('express'); // utilisé pour créer des applications web et des API de manière simple et rapide
const fs = require('fs'); // Inclusion du module intégré 'fs' pour le système de fichiers
const path = require('path'); // module pour travailler avec le chemin complet du fichier
const bodyParser = require('body-parser'); // Middleware pour parser les corps de requêtes
const nodemailer = require('nodemailer'); // Module pour envoyer des emails
const multer = require('multer'); // Module pour gérer les téléchargements de fichiers
const { error } = require('console');
const port = 8080; // Port sur lequel le serveur écoute

// Création de l'application Express
const app = express();
// Création des fichiers de stockage des commentaires et des contacts
const COMMENTS_FILE = 'commentaires.txt'; 
const CONTACTS_FILE = 'contacts.txt';

// Configuration de multer pour le téléchargement des images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'models/apps/images/server/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware pour servir les fichiers statiques depuis le répertoire 'models/apps'
app.use(express.static(path.join(__dirname, 'models/apps')));
app.use('/css_styles', express.static(path.join(__dirname, 'models/apps/css_styles')));
app.use('/images', express.static(path.join(__dirname, 'models/apps/images')));
app.use('/scripts', express.static(path.join(__dirname, 'models/apps/scripts')));

// Middleware pour parser les données URL-encodées (formulaire)
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware pour parser les données JSON
app.use(bodyParser.json());
// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Route pour gérer la soumission des commentaires
app.post('/submit-comment', upload.single('image'), (req, res) => {
    const { name, comment } = req.body;
    const imageUrl = req.file ? `/images/server/${req.file.filename}` : '/images/default_profile.png';
    const comment_data = { name, comment, imageUrl, timeStamp: new Date() };

    fs.appendFile(COMMENTS_FILE, JSON.stringify(comment_data) + '\n', (err) => {
        if (err) {
            console.error('Erreur de l\'écriture du commentaire dans le fichier de destination.', err);
            res.status(500).send('Erreur interne du serveur');
            return;
        } 
        res.status(200).send('Commentaire ajouté.');
    });
});

// Route pour récupérer les commentaires
app.get('/get-comments', (req, res) => {
    fs.readFile(COMMENTS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Échec de la lecture du fichier des commentaires', err);
            res.status(500).send('Problème interne du serveur');
            return;
        }
        else{
        const commentaires = data.trim().split('\n').map(line => JSON.parse(line)).slice(-10);
        res.json(commentaires);}
    });
});

// Endpoint pour gérer la soumission du formulaire de contact
app.post('/submit-form', (req, res) => {
    const { Nom, email, message } = req.body;
    const contactData = `Name: ${Nom}, Email: ${email}, Message: ${message}\n`;
    console.log(contactData);
    fs.appendFile(CONTACTS_FILE, contactData, (err) => {
        if (err) {
            return res.status(500).send('Erreur du serveur');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nherlysemorisset@gmail.com',
				pass: 'yald fxwq hzpq sgia'
            }
        });
        //configuration d'un email de confirmation au user
        const mailOptions = {
            from: 'nherlysemorisset@gmail.com',
            to: email,
            subject: 'Confirmation de réception de votre message',
            text: `Bonjour ${Nom},\n\nNous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nL'équipe`
        };
        //configuration d'un email de confirmation a l'administrateur de l'agence
        const mailOptions2 = {
            from: 'nherlysemorisset@gmail.com',
            to: 'nherlysemorisset@gmail.com',
            subject: 'reception de nouvelle infos',
            text: `Bonjour monsieur/madame,\n\n Vous avez recus un nouveau formulaire de contact.\n nom du user: ${Nom}\n Email de user: ${email}\n Message: ${message}. \n\nCordialement.\n`
        };
        
        //envoi d'un email de confirmation de l'agnce au user
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Erreur de submission du formulaire de contact.");
                return res.status(500).send('Erreur du serveur');
            }
            res.json({ success: true, message: 'Message reçu et email de confirmation envoyé' });
            alert('Nous avons envoyé un email a votre adresse, confimant que nous avons recu vos informations. ');
            console.log("Message reçu et email de confirmation envoyé");
        });

        //envoi d'un email contenant les info du user au responsable de l'agnce
        transporter.sendMail(mailOptions2, (error, info) =>{
            if (error) {
                console.log("Erreur de submission du formulaire de contact.");
                return res.status(500).send('Erreur du serveur');
            }
            res.json({ success: true, message: 'Message reçu et email de confirmation envoyé' });
            alert('Nous avons envoyé un email a votre adresse, confimant que nous avons recu vos informations. ')
            console.log("Message reçu et email de confirmation envoyé");
        });
    });
});

// Route pour servir le fichier HTML par défaut (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'models/apps/index.html'));
});

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
