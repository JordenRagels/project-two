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

  //create user profile route
  // and send data to page
  app.get("/user/profile", function(req, res) {
    res.render("userProfile", {
      title: "Voluntour - User Profile"
    });
  });

  // create admin profile route
  app.get("/admin/profile", function(req, res) {
    res.render("adminProfile", {
      title: "Voluntour - Admin Profile"
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
