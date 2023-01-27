const mongoose = require('mongoose');
const { DB_STRING } = require('../constants');

async function connectToDb() {
  await mongoose.connect(DB_STRING);
}

connectToDb().catch((err) => {
  console.log(`DB ERROR ============>`, err);
});

module.exports = {
  Schema: mongoose.Schema,
  model: mongoose.model,
};
