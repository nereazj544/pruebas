// models/release.model.ts
const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
    title: String,
    releaseDate: Date,
    imageUrl: String,
    description: String,
    authors: [String]
});

module.exports = mongoose.model('Release', releaseSchema);