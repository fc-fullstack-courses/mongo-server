const { Schema, model } = require('../index');

const tokenSchema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = model('Token', tokenSchema);

module.exports = Token;
