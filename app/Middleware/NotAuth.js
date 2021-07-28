'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class NotAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth, session }, next) {
    // call next to advance the request
    try {
      const user = await auth.check()
      if (user) {
        return response.redirect('/home')
      }
    } catch {
      await next()

    }
  }
}

module.exports = NotAuth
