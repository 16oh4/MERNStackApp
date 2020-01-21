const mongoose = require('mongoose');

//Mongoose schema constructor
const Schema = mongoose.Schema;

//Schema maps to a mongoDB collection and defines the shape of documents in that collection
//String, Number, Date are all 'SchemaType's as defined by Mongoose
const exerciseSchema = new Schema(
{
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
},
{
    timestamps: true,
}

);

//Compile schema into a model (class that constructs documents for mongoDB)
const Exercise = mongoose.model('Exercise', exerciseSchema);

//So that the server.js can use this model
module.exports = Exercise;