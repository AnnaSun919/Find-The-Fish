const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    // default:"https://res.cloudinary.com/dtjxpedls/image/upload/v1625579445/uhqx9pvj5uzkrtnqp7fx.jpg"
  },
});

const User = model("User", userSchema);

module.exports = User;
