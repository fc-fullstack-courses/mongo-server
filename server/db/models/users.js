const yup = require('yup');
const bcrypt = require('bcrypt');
const { Schema, model } = require('../index');
const { SALT_ROUNDS } = require('../../constants');

const emailSchema = yup.string().email().required();

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => emailSchema.isValid(value),
      },
    },
    isMale: Boolean,
    password: {
      type: String,
      required: true,
      set: (password) => {
        const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);
        return passwordHash;
      }
    },
    birthday: {
      type: Date,
    },
    contacts: {
      phone: { type: String },
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
