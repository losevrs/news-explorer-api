const { celebrate, Joi } = require('celebrate');
const articlesRouter = require('express').Router();

const { urlRegExp } = require('../validation/regexpressions');

const {
  createArticle,
  getArticles,
  deleteArticle,
  getArticleByURL,
} = require('../controllers/articles');

articlesRouter.get('/', getArticles);

articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

articlesRouter.post('/url', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    link: Joi.string().required().regex(urlRegExp),
    date: Joi.string().required(),
    source: Joi.string().required(),
  }).unknown(true),
}), getArticleByURL);

articlesRouter.post('/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().regex(urlRegExp),
      image: Joi.string().required().regex(urlRegExp),
    }).unknown(true),
  }), createArticle);

module.exports = articlesRouter;
