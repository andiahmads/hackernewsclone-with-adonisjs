'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with news
 */

const { validate } = use('Validator');
const News = use('App/Models/News');
class NewsController {
  /**
   * Show a list of all news.
   * GET news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ view }) {
    return view.render('news.submit')
  }

  /**
   * Render a form to be used for creating a new news.
   * GET news/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new news.
   * POST news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async home({ view, auth, response }) {
    const user = await auth.getUser();

    const news = await News.query().where('user_id', user.id).fetch();
    return view.render('home', { news: news.toJSON() });
  }

  async store({ request, response, auth, session }) {

    const body = request.all();
    const user = await auth.getUser();

    const rules = {
      title: 'required',
      url: 'required'
    };
    const messages = {
      "title.required": "title tidak boleh kosong",
      "url.required": "url tidak boleh kosong",
    };

    const validation = await validate(body, rules, messages)
    if (validation.fails) {
      session.withErrors(validation.messages())
    }
    const news = await new News();
    news.user_id = user.id;
    news.title = body.title;
    news.url = body.url;
    await news.save();
    session.flash({ success: 'News created Successfully!' });
    return response.redirect('/home');
  }

  /**
   * Display a single news.
   * GET news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing news.
   * GET news/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update news details.
   * PUT or PATCH news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a news with id.
   * DELETE news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = NewsController
