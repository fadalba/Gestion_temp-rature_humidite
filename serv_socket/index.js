// on install avec npm install http, url et ws
//ws : Qui va nous permettre de créer une connexion Web-socket
//http : Qui va nous permettre de créer un serveur HTTP
//url : Qui va nous permettre de gérer et parser des url pour le serveur HTTP
const http = require('http');
const url = require('url');
const wsServer = require('ws').Server;
 // on a besoin de 2 variables qui vont correspondre aux ports de connexions pour le serveur http et les WebSockets. 
 
const HTTP_PORT = 8081;                                                                                                                                                                                                                                                                                                                                             
const WS_PORT = 4041;

// La fonction anonyme passée en paramètre de http.createServeur() se déclenche lorsqu’un client http va se connecter au serveur 
//et la fonction passée en paramètre de listen() se déclenche lorsque le serveur commence à écouter le port HTTP_PORT 
//(en gros, lorsque le serveur est prêt).
// on peut tester le server avec node index.js
http.createServer(function(req, res) {
  //  On utilise url.parse() pour récupérer l’url complète de la requête. Cela va nous permettre de pouvoir implémenter des 
 //   comportement différents en fonction de l’url. Pour l’instant, si on détecte que la requête a été faite sur le 
   // chemin “/broadcast” on retourne au client HTTP le message qu’il nous a envoyé afin de confirmer sa bonne réception.
  // On utilise parsedUrl.query pour récupérer les paramètres de la requête GET qui ont été passés dans l’url. 
  //Dans notre cas on désire que le client ait passé le paramètre “message”
   let parsedUrl = url.parse(req.url, true);
    let query = parsedUrl.query;
    let reponse = 'Bonjour Fadel, vous n"avez pas de message';
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (parsedUrl.pathname == '/broadcast' &&
        query.message != null
    ) {
        res.end('Bonjour Fadel, votre message est :' + query.message);
       // On utilise le serveur WebSocket pour parcourir tous les clients connectés puis leur envoyer le message msg passé 
     //   en paramètre de la fonction broadcast().
        broadcast(query.message);
    }
    res.end(reponse);
}).listen(HTTP_PORT, function() {
    console.log("HTTP Server ouvert sur: http://localhost:%s", HTTP_PORT);
});

//new wsServeur() va créer un serveur WebSocket accessible sur ws://localhost et sur le port WS_PORT (4040 dans notre cas)
const ws = new wsServer({ port: WS_PORT }, function() {
    console.log("Bonjour Fadel, votre Web socket est au port: ws://localhost:%s", WS_PORT);
});

ws.on('connection', function connection(ws) {
    console.log('bonjour Fadel, nouvelle donnée');
});

/** parcours de la liste des clients  connectés**/
function broadcast(msg) {
    ws.clients.forEach(function each(client) {
        client.send(msg); 
    });
};

//Maintenant, lorsque vous relancez le serveur Node et que vous allez sur l’url :

//http://localhost:8080/broadcast?message=Hello


/* *********************************************************coté arduino**************************************** */

var express = require('express');
/* var config = require('./config'); */
var fileUpload = require('express-fileupload');
var fs = require('fs');
var router = express.Router();
var app = express();
var assert = require('assert');

var server = http.createServer(app);
var mongodb = require('mongodb');
var io = require("socket.io")(server, 
{     cors: 
    {origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    credentials: false     }
});
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var binary = mongodb.Binary;

app.use(express.static('public'));

var Url = "mongodb+srv://fadalba:Thiaroye44@cluster0.daoknxe.mongodb.net/test"; 
server.listen(4001, function() {
    console.log('Demarrage du serveur Mongo au port', 4001);
})

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 })// Si la vitesse de transmission est de 9600 (norme pour nos balances), 

//cela signifie que l'appareil peut envoyer 9600 bits par seconde à la sortie maximale et le port USB est définie

// On lit les donnees par ligne telles quelles appa raissent
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
 
parser.on('open', function() {
    console.log('Connexion ouverte');
 });

 /* *************gestion ventilateur *********voir coté ts de test et iot service*******************************/
 io.on("connection", (socket) => {
    socket.on('allum', data => {
    socket.emit('all', 'recu')
        console.log(data)
        port.write(data) // écrire sur arduino
        port.drain(err=>{
            console.log(err)
        })
    })
  })
/* *************gestion ventilateur *********fin*******************************/
parser.on('data', function(data) {
   console.log('Températures et Humidités:'); 
   let temp = data.split('/');
  console.log(temp); 
  io.emit('data', {"temperature": temp[0], "humidite": temp[1]});  // envoi de la température avec emit


    //calcul de la date et l'heure 
    var datHeure = new Date(); // date
    var min = datHeure.getMinutes();
    var heur = datHeure.getHours(); //heure
    var sec = datHeure.getSeconds(); //secondes
    var mois = datHeure.getDate(); //renvoie le chiffre du jour du mois 
    var numMois = datHeure.getMonth() + 1; //le mois en chiffre
    var laDate = datHeure.getFullYear(); // me renvoie en chiffre l'annee
    if (numMois < 10) { numMois = '0' + numMois; } // si le jour est <10 on affiche 0 devant
    if (mois < 10) { mois = '0' + mois; } // si le mois est <10 on affiche 0 devant
    if (sec < 10) { sec = '0' + sec; }
    if (min < 10) { min = '0' + min; }
    var heureInsertion = heur + ':' + min + ':' + sec;
    var heureEtDate = mois + '/' + numMois + '/' + laDate;
       //fin test

       //Insertion à la base de donénes

    if ((heur == 11 && min == 35 && sec == 00) || (heur == 17 && min == 27 && sec == 10) || (heur == 17 && min == 29 && sec == 00)) {
        var tempe = parseInt(temp[0]); 

        var humi = parseInt(temp[1]);
        console.log("insertion" + tempe);
        
        //l'objet qui contient la temperature, humidite et la date
        var tempEtHum = { 'Temperature': temp[0], 'Humidite': temp[1], 'Date': heureEtDate, 'Heure': heureInsertion };
        //Connexion a mongodb et insertion Temperature et humidite
        MongoClient.connect(Url, { useUnifiedTopology: true }, function(err, db) {
           console.log('connecté');
            if (err) throw err;
            var dbo = db.db("test"); // nom de ma bdd
            dbo.collection("climat").insertOne(tempEtHum, function(err, res) {
                if (err) throw err;
                console.log("nouvelle insertion dans la bdd");
                db.close();
            });
        });

    } //Fin if
});
app.get('', (req, res) => {


}); 

//Si on arrive pas a lire sur le port, on affiche l'erreur concernee
port.on('error', function(err) {
    console.log(err);
});


app.use("/", router);