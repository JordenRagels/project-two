var db = require("../models");

module.exports = function(app) {
  // POST route for saving a new user
  app.post("/user/register", function(req, res) {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // route for adding an administrator
  app.post("/admin/register", function(req, res) {
    console.log(req.body);
    db.Organization.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      org: req.body.org,
      volunteers: req.body.volunteers,
      hours: req.body.hours
    }).then(function(dbOrganization) {
      res.json(dbOrganization);
    });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/orgs", function(req, res) {
    db.Organization.findAll().then(function(dbOrganization) {
      res.json(dbOrganization);
    });
  });
};
