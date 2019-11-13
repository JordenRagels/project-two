// const express = require('express')
// const app = express()
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(3000, () => console.log('Server ready'))

// index.jsconst express = require('express');
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const Sequelize = require("sequelize");

// initialize an instance of Sequelize
const sequelize = new Sequelize({
    database: "users_db",
    username: "root",
    password: "l5heLWmUs0j5zE2",
    dialect: "mysql"
});

// check the database connection
sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully"))

    .catch(err => console.error("Unable to connect to the database:", err));

// create user model
const User = sequelize.define("user", {
    name: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.BIGINT,
    },
    start_time: {
        type: Sequelize.DATE,
    },
    end_time: {
        type:
            Sequelize.DATE,
    }

});

const Organization = sequelize.define("organization", {
    name: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    org: {
        type: Sequelize.STRING,
    },
    volunteers: {
        type: Sequelize.STRING,
    },
    hours: {
        type: Sequelize.INTEGER,
    }


});

// create table with user model
User.sync()
    .then(() => console.log("Oh yeah! User table created successfully"))
    .catch(err => console.log("BTW, did you enter wrong database credentials?"));

Organization.sync()
    .then(() => console.log("Oh yeah! User table created successfully"))
    .catch(err => console.log("BTW, did you enter wrong database credentials?"));

// create some helper functions to work on the database
const createUser = async ({ name, username, password, email, phone, start_time, end_time }) => {
    return await User.create({ name, username, password, email, phone, start_time, end_time });
}; const getAllUsers = async () => {
    return await User.findAll();
}; const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

const createOrganization = async ({ name, username, password, org, volunteers, hours }) => {
    return await Organization.create({ name, username, password, org, volunteers, hours });
}; const getAllOrganizations = async () => {
    return await Organization.findAll();
}; const getOrganization = async obj => {
    return await Organization.findOne({
        where: obj,
    });
};

// add a basic route
app.get('/', function (req, res) {
    // display home page info here
    // res.send('index', data);
    res.json({ message: "Express is up!" });
});

// html route for the login page
// will display the login.html page
app.get('/login', function (req, res) {
    res.send('login', data);
});

// html route for the user check in page
app.get('/', function (req, res) {
    res.send('index', data);
})

// get all users
app.get("/users", function (req, res) {
    getAllUsers().then(user => res.json(user));
});

// get all admin users
app.get("/admin/users", function (req, res) {
    getAllOrganizations().then(organization => res.json(organization));
});

app.get("/admin/profile", function (req, res) {
    // res.send('admin page', data);
    console.log("it works");
})

// profile page route, will display user data from database 
app.get("/user/profile", function (req,res) {
    // res.send('profile', data);
    console.log("it works");
})

// user register route
app.post("/register", function (req, res, next) {
    const { name, username, password, email, phone, start_time, end_time } = req.body;
    createUser({ name, username, password, email, phone, start_time, end_time }).then(user =>
        res.json({ user, msg: "account created successfully" })
    );
});

// admin register route
app.post("/admin/register", function (req, res, next) {
    const { name, username, password, org, volunteers, hours } = req.body;
    createOrganization({ name, username, password, org, volunteers, hours }).then(organization =>
        res.json({ organization, msg: "account created successfully" })
    );
});

// login route 
app.post("/login", function (req, res, next) {
    const { name, username, password } = req.body;
    createUser({ name, username, password }).then(user =>
        res.json({ user, msg: "account created successfully" })
    );
});



// start the app
app.listen(3000, function () {
    console.log("Express is running on port 3000");
});

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile('public/index.html');
// });

// app.listen(3000, () => console.log('server started'));


