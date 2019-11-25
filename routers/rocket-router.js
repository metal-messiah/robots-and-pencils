const CrudController = require('../controllers/crud-controller');
const Router = require('./router');
const Rocket = require('../models/rocket');

module.exports = class RocketRouter extends Router {
  constructor(app) {
    const table = app.get('db').rap;
    const controller = new CrudController(table, true, Rocket);

    // the app only required GET methods in spec, but I built it to allow PUT, POST, DELETE for more predefined functionality here
    const controllerRouteMethods = ['GET'];
    super(app, '/api/rap', controller, controllerRouteMethods);

    console.log('made rocket routes!');
  }
};
