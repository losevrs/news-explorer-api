const mongoose = require('mongoose');
const { isURL } = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Ключ поиска обязателен.'],
  },
  title: {
    type: String,
    required: [true, 'Заголовок статьи обязателен.'],
  },
  text: {
    type: String,
    required: [true, 'Текст статьи обязателен.'],
  },
  date: {
    type: String,
    required: [true, 'Дата обязательна.'],
  },
  source: {
    type: String,
    required: [true, 'Источник указать обязательно.'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isURL(link),
      message: 'Необходимо ввести ссылку на статью в формате url!',
    },
  },
  image: { // Иллюстрация к статье - url
    type: String,
    required: true,
    validate: {
      validator: (link) => isURL(link),
      message: 'Необходимо ввести ссылку на статью в формате url!',
    },
  },
  owner: { // Владелец
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

articleSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

module.exports = mongoose.model('article', articleSchema);
