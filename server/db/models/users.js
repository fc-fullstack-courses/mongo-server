const { Schema, model } = require('../index');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  isMale: Boolean,
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  contacts: {
    phone: { type: String },
  },
});

const User = model('User', userSchema);

module.exports = User;
