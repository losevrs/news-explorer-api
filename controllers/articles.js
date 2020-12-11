const Article = require('../models/article');
const { ObjectForError } = require('../validation/errors');

const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.json(article))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId).select('+owner')
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id.toString()) {
        next(new ObjectForError('Forbidden'));
        return;
      }
      Article.findByIdAndRemove(articleId)
        .orFail(new ObjectForError('ObjectNotFound'))
        .then((articleData) => res.json(articleData))
        .catch(next);
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.json(articles))
    .catch(next);
};

module.exports = {
  createArticle,
  deleteArticle,
  getArticles,
};
