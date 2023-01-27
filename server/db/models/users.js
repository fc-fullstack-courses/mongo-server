const yup = require('yup');
const { Schema, model } = require('../index');

const emailSchema = yup.string().email().required();

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (value) => emailSchema.isValid(value)
    }
   },
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
}, {timestamps: true });

const User = model('User', userSchema);

module.exports = User;
