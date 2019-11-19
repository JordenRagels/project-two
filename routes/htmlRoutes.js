var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      title: "Voluntour - Home"
    });
  });

  //Login in page
  app.get("/login", function(req, res) {
    res.render("loginPage", {
      title: "Voluntour - Login"
    });
  });

  // create account route
  app.get("/create", function(req, res) {
    res.render("createAcct", {
      title: "Voluntour - Create Account"
    });
  });

  app.get("/create/admin", function(req, res) {
    res.render("adminCreate", {
      title: "Voluntour - Create Admin Account"
    });
  });

  //Login in page
  app.get("/login", function(req, res) {
    res.render("login", {
      title: "Voluntour - Login"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
