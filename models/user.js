const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const { ObjectForError } = require('../validation/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле обязательно для заполнения.'],
    unique: [true, 'Поле не уникально.'],
    validate: {
      validator: (mail) => isEmail(mail),
      message: 'Необходимо ввести электронную почту!',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле обязательно для заполнения.'],
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    default: '',
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new ObjectForError('LoginFailed'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((match) => {
        if (!match) {
          return Promise.reject(new ObjectForError('LoginFailed'));
        }
        return user;
      }));
};

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
