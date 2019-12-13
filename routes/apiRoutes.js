var db = require('../models');

module.exports = function(app) {
	// POST route for saving a new user
	app.post('/user/register', function(req, res) {
		console.log(req.body);
		db.User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			startTime: req.body.startTime,
			endTime: req.body.endTime
		}).then(function(dbUser) {
			res.redirect('/login');
		});
	});

	// route for adding an administrator
	app.post('/admin/register', function(req, res) {
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

	// gets all the database info and sends it to admin page
	app.get('/admin/profile', function(req, res) {
		db.Organization.findAll().then(function(dbOrganization) {
			// console.log(dbOrganization[0]);
			res.render('adminProfile', {
				data: dbOrganization
			});
		});
	});

	// gets all the database info and sends it to user page
	app.get('/user/profile', function(req, res) {
		db.Organization.findAll().then(function(dbOrganization) {
			// console.log(dbOrganization[0]);
			res.render('userProfile', {
				data: {...dbOrganization}
			});
		});
	});
	// displays all users
	app.get('/api/users', function(req, res) {
		db.User.findAll().then(function(dbUser) {
			res.json(dbUser);
			console.log(dbUser);
		});
	});

	// displays all the organizations
	app.get('/api/orgs', function(req, res) {
		db.Organization.findAll().then(function(dbOrganization) {
			res.json(dbOrganization);
		});
	});

	app.post('/api/user/login', (req, res) => {
		console.table(req.body);
		db.User.findAll().then(
			dbUser => console.log(dbUser)
			// dbUser&&dbUser.length&&res.json(dbUser.find(dbUser.username===req.body.username&&dbUser.password===req.body.password))
		).then(() => res.redirect('/user/profile'));
	});
};
