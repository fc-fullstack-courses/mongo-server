const Message = require('../db/models/message');

module.exports.createMessage = async (req, res, next) => {
  const {
    body,
    tokenData: { id: userId },
  } = req;

  const message = await Message.create({ ...body, author: userId });

  res.status(201).send({ data: message });
};

module.exports.getMessages = async (req, res, next) => {
  const messages = await Message.find().populate('author').select(['-__v']);

  res.send({ data: messages });
};
