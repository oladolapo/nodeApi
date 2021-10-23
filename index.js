// imports express from the node_modules folder
var express = require('express');
const user = require("./controller/user");
const contact = require("./controller/contact");
const path = require('path');
const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  } = require("./controller/user");

const upload = require("./utils/multerConfig");

// initialize express to  app variable
const app = express();

// app.set('view engine', 'ejs'); 
// app.set('views', './views');

app.use(express.static("./views"));
app.use(express.static(path.resolve('public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', user.homepage)

// updates a user 
app.put('/user/:id', upload.single("avatar"), user.updateUser);

// get all users
app.get("/user/all", user.getAllUsers);

// Get a single user
app.get("/user/:id", user.getOneUser);
// create a user
app.post("/user", user.createUser);
app.delete('/user/:id', user.deleteUser);

app.post("/contact", contact.processForm);
// set the port to listening on 
app.set('port', process.env.PORT || 3000);
// get the port and listen on it
app.listen(app.get("port"), _ => console.log(`listening on port ${app.get("port")}`));
