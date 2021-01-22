const Article = require('../models/article');
const { ForbiddenError } = require('../validation/ForbiddenError');
const { ObjectNotFoundError } = require('../validation/NotFoundError');

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
    .orFail(new ObjectNotFoundError())
    .then((article) => {
      if (article.owner.toString() !== req.user._id.toString()) {
        next(new ForbiddenError());
        return;
      }
      Article.findByIdAndRemove(articleId)
        .orFail(new ObjectNotFoundError())
        .then((articleData) => res.json(articleData))
        .catch(next);
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .then((articles) => res.json(articles))
    .catch(next);
};

const getArticleByURL = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    link,
    date,
    source,
  } = req.body;

  Article.find({
    owner, link, keyword, title, date, source,
  })
    .orFail(new ObjectNotFoundError())
    .then((articles) => res.json(articles))
    .catch(next);
};

module.exports = {
  createArticle,
  deleteArticle,
  getArticles,
  getArticleByURL,
};
