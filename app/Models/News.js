'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class News extends Model {

  static castDates(field, value) {
    if (field === "created_at") {
      return `${value.fromNow(true)} ago`
    }
  }

  user() {
    return this.belongsTo("App/Models/User")
  }

}

module.exports = News
