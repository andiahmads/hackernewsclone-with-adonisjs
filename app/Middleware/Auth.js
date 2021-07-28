'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response, session, view }, next, back) {
    // call next to advance the request
    try {
      //cek apakah user benar
      const user = await auth.check();
      if (user) {
        await next()
      }

      //kalau benar next
    } catch {
      session.flash({ error: 'Kamu belum Login..!' })
      return response.redirect('/login')

    }

  }
}

module.exports = Auth
