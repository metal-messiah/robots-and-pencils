const routers = [
  require('./rocket-router'),
];

class RouterModule {
  constructor() {}

  init(app) {
    routers.forEach(router => new router(app));
  }
}

module.exports = new RouterModule();
