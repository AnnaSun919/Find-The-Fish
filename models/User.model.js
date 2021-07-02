const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {  
    type: String,
    unique: true,
<<<<<<< HEAD
    required: true,
  },

  password: {
    type: String,
    required: true,
  }  
=======
    require: true,
  },
  password: {
    type: String,
    required : true
 
  },
  favoritefish:{
    type : String,
    required : true
  }
>>>>>>> f32b62cab81abaf9ceab49c4a22004d0cc0f776d
});

const User = model("User", userSchema);

module.exports = User;
