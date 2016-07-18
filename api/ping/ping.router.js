class PingRouter {
  constructor(app) {
    const controller = require('./ping.controller');
    this.initRouter(app, controller);
  }

  initRouter(app, controller) {
    app.get('/ping1', controller.ping1);
    app.get('/ping2', controller.ping2);
  }
}

module.exports = (app) => {
  return new PingRouter(app);
}
