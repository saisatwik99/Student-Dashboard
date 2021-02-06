const express = require('express');
const mongoose = require('mongoose');

const app = express();

const adminRoutes = require('./routes/admin');

const MONGODB_URI =
'mongodb+srv://student:student@cluster1.7afip.mongodb.net/Student-Dashboard?retryWrites=true&w=majority';

app.use("/admin",adminRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
