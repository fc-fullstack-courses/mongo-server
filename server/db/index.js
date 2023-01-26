const mongoose = require('mongoose');

const DB_STRING =
  process.env.DB_STRING ||
  'mongodb+srv://admin:admin@cluster0.rydpyo5.mongodb.net/chatDb';

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
