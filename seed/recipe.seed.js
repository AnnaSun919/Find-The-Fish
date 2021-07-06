require('../db')

const mongoose = require("mongoose");
const RecipeModel = require("../models/Recipe.model");

// Iteration #1
RecipeModel.insertMany([
        { title: "Salmon", ingredients: "Salmom", instructions: "Cook" },
        { title: "Tuna", ingredients: "Tuna", instructions: "Cook" },
        { title: "Shark", ingredients: "Shark", instructions: "Cook" }
])
    .then(() => {
        console.log('Recipe added')
        mongoose.connection.close()
    })

    .catch(() => {
        console.log('Seeding failed')
        mongoose.connection.close()
    })

  