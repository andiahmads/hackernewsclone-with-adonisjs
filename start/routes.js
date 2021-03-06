'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', 'HomeController.index');
Route.get('/new', 'HomeController.new');
Route.get('/past', 'HomeController.past');

Route.group(() => {
  Route.get("/register", "AuthController.index");
  Route.get("/login", "AuthController.login")

}).middleware(['notauth'])

Route.post("/register", "AuthController.register");


Route.post("/login", "AuthController.auth");
Route.get("/logout", "AuthController.logout");


Route.group(() => {
  Route.get("/home", "NewsController.home")
  Route.get("/submit", "NewsController.index")
  Route.post("/submit", "NewsController.store")
  Route.get("/news/:id", "NewsController.show")
  Route.post("/news/:id", "NewsController.update").as('edit');
  Route.get("/delete/news/:id", "NewsController.destroy")
}).middleware('authenticated')
