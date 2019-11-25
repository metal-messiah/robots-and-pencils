const RouteMethods = require('../models/route-methods');

module.exports = class Router extends RouteMethods {
  constructor(app, path, controller, controllerRouteMethods) {
    super(controllerRouteMethods); // expecting array ["GET", "POST", etc]
    this.app = app;
    this.path = path;
    this.controller = controller;

    if (this.GET) {
      // get one record based on table id
      app.get(`${this.path}/:id`, async (req, res) => {
        const { status, data } = await this.controller.findOne(req.params.id);
        res.status(status).send(data);
      });

      // find all records (with optional query object generated from url query params)
      app.get(`${this.path}`, async (req, res) => {
        const { status, data } = await this.controller.findAll(req.query);
        res.status(status).send(data);
      });
    }

    if (this.POST) {
      // create new record
      app.post(`${this.path}`, async (req, res) => {
        const { status, data } = await this.controller.addOne(req.user.id, req.body);
        this.checkRefresh(data);
        res.status(status).send(data);
      });
    }

    if (this.PUT) {
      // update record by id
      app.put(`${this.path}/:id`, async (req, res) => {
        const { status, data } = await this.controller.saveOne(req.params.id, req.body);
        this.checkRefresh(data);
        res.status(status).send(data);
      });
    }

    if (this.DELETE) {
      // delete record by id
      app.delete(`${this.path}/:id`, async (req, res) => {
        const { status, data } = await this.controller.deleteOne(req.params.id);
        this.checkRefresh(data);
        res.status(status).send(data);
      });
    }
  }
};
