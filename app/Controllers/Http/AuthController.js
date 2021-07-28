'use strict'
const User = use('App/Models/User');
const { validate } = use('Validator');

class AuthController {

  async index({ view }) {
    return view.render('auth.register');
  }
  async login({ view }) {
    return view.render('auth.login');

  }


  async register({ request, response, session }) {
    const body = request.all();
    const rules = {
      email: "required|email|unique:users",
      name: "required|min:4|max:30",
      password: "required|min:6"
    }

    //custom message
    const messages = {
      "email.required": "Email tidak boleh kosong",
      "email.unique:": "Email sudah terdaftar",
      "name.required:": "Name tidak boleh kosong",
      "name.min:": "Name tidak boleh kurang dari 4 char",
      "password.required:": "Password tidak boleh kosong",
      "password.min:": "Password tidak boleh kurang dari 6 char",
    }

    const validations = await validate(body, rules, messages)
    if (validations.fails()) {
      session.withErrors(validations.messages());
      return response.redirect('back');
    }

    const user = await new User();
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    await user.save();
    session.flash({ success: "Registrasi berhasil" });
    return response.redirect('/login');
  }

  async auth({ request, response, session, auth, view }) {

    const body = request.all();
    const rules = {
      email: "required|email",
      password: "required|min:6"
    }

    //custom message
    const messages = {
      "email.required": "Email tidak boleh kosong",
      "password.required:": "Password tidak boleh kosong",
      "password.min:": "Password tidak boleh kurang dari 6 char",
    }

    const validations = await validate(body, rules, messages)
    if (validations.fails()) {
      session.withErrors(validations.messages());
    }

    await auth.attempt(body.email, body.password);
    session.flash({ success: "login berhasil" });
    return response.redirect('/home')

  }

  async logout({ auth, response, session }) {
    await auth.logout();
    session.flash({ success: 'logout berhasil' })
    return response.redirect('/login')
  }
}

module.exports = AuthController
