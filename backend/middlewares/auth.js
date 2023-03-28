const jwt = require("jsonwebtoken");//requirer jsonwebtoken c a d 
// ng g s creation de service  
module.exports = (req, res, next) => { //req envoie de erquette res reponse 
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "longer-secret-is-better");
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};