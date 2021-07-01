const mongoose = require('mongoose')


let habitatImpacts = 'Habitat Impacts';
let imageGallery = 'Image Gallery'; 
let scientificName = 'Scientific Name';
let speciesAliases = 'Species Aliases';
let speciesIllustrationPhoto = 'Species Illustration Photo';
let speciesName = 'Species Name';


const FishSchema = new mongoose.Schema({
Habitat: String,
habitatImpacts: String,
imageGallery: String,
Location: String,
Population: String,
scientificName: String,
speciesAliases: String,
speciesIllustrationPhoto: String,
speciesName: String,
Biology: String,

})

const FishModel = mogoose.model('fish', FishModel)

module.exports = FishModel