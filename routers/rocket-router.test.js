const express = require('express'),
  app = express(),
  massive = require('massive'),
  eh = require('../js/error-handler');

const RocketRouter = require('./rocket-router');
const { massiveOptions } = require('../config');

test("Router's controller has db tables", async () => {
  const [err, data] = await eh(massive(massiveOptions));
  app.set('db', data);
  const rocketRouter = new RocketRouter(app);

  expect(err).toBeNull();
  expect(rocketRouter.controller.table).not.toBeNull();
  expect(rocketRouter.controller.table).toMatchObject(app.get('db').rap);
});

test("Router's access path is valid", async () => {
  const rocketRouter = new RocketRouter(app);
  expect(rocketRouter.path).toBe('/api/rap');
});
