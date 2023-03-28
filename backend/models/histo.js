const mongoose = require('mongoose'); //
const Schema = mongoose.Schema;


let histoSchema = new Schema({
    Temperature: { type: String },
    Humidite: { type: String},
    Date: { type: String},
    Heure: { type: String},
    
},
{
    collection: 'climat'
})



module.exports = mongoose.model('climat', histoSchema)
