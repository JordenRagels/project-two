var db = require("../models");

module.exports = function(app) {
  /******************************************* GET ROUTES  ******************************************/

  // GET route to display all users
  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // GET route to display all organizations
  app.get("/api/orgs", function(req, res) {
    db.Organization.findAll().then(function(dbOrganization) {
      res.json(dbOrganization);
    });
  });

  // GET route to display the admin page and associated info
  app.get("/admin/profile", function(req, res) {
    db.User.findAll().then(function(dbUser) {
      // console.log(dbOrganization[0]);
      res.render("adminProfile", {
        title: "Voluntour - Admin Page",
        userData: dbUser
      });
    });
  });

  // GET route to display the user profile page and related info
  app.get("/user/profile", function(req, res) {
    db.Organization.findAll().then(function(dbOrganization) {
      // console.log(dbOrganization[0]);
      res.render("userProfile", {
        title: "Voluntour - User Profile Page",
        data: dbOrganization
      });
    });
  });

  /************************************************************************************************/

  /******************************************* POST ROUTES  ******************************************/

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
      res.render("/userProfile");
    });
  });

  // POST route for adding an administrator
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

  // // POST route for logging in
  // app.post("/api/user/login", function(req, res){
  //   console.log(req.body);
  //   req.body.username,
  //   req.body.password
  // }).then(function());

  // POST route for adding a new volunteer
  app.post("/user/add", function(req, res) {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone
    }).then(function(dbUser) {
      // We have access to the new volunteer as an argument inside of the callback function
      res.json(dbUser);
    });
  });
  /************************************************************************************************/

  // DELETE route for deleting users. We can get the id of the user to be deleted from
  // req.params.id
  app.delete("/api/user/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // PUT route for updating users. We can get the updated user data from req.body
  app.put("/api/user/update", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.User.update(
      {
        email: req.body.email,
        phone: req.body.phone
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
