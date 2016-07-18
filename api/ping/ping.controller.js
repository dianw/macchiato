class PingController {
  ping1(req, res) {
    const session = req.session;
    session.message = session.message || 0;
    session.message += 1;

    res.send(`${session.message}`);
  }

  ping2(req, res) {
    res.send(`${req.session.message}`);
  }
}

module.exports = new PingController();
