const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hashedPassword) {
        // Store hash in your password DB.
        console.log(hashedPassword);
});

app.listen(3000, () => {
        console.log("Server is running on port 3000");
});
