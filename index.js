const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const store = new MongoDBStore({
  uri: "mongodb+srv://student:student@cluster1.7afip.mongodb.net/Student-Dashboard",
  collection: 'sessions'
});
dotenv.config();

app.set('view engine', 'ejs');

app.use(express.json());

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  }))

app.use("/admin",adminRoutes);
app.use("/user",userRoutes);
app.use("/", (req, res) => {
  res.render('index');
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
