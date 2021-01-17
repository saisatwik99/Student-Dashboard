const express = require('express');
const app = express();

const home    =     require("./routes/home");
const signup  =     require("./routes/signup");
const login  =     require("./routes/login");

app.use("/",home);
app.use("/signup",signup);
app.use("/login",login);

app.listen(3000, () => {
    console.log("Server listening at 3000");
});
