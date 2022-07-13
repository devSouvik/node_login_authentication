const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

let users = [];

app.get("/users", (req, res) => {
        res.json(users);
});

app.post("/createUser", async (req, res) => {
        try {
                bcrypt.hash(
                        req.body.password,
                        10,
                        function (err, hashedPassword) {
                                console.log(hashedPassword);
                                // Store hash in your password DB.
                                let user = {
                                        name: req.body.name,
                                        password: hashedPassword,
                                };
                                users.push(user);
                                // res.json(users);
                                res.status(201).send("new user created");
                        }
                );
        } catch (e) {
                console.log(e);
        }
});

app.post("/login", async (req, res) => {
        let user = users.find((user) => user.name === req.body.name);
        if (user == null) {
                return res.status(404).send("user not found");
        }
        try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                        res.status(200).send("login successful");
                } else {
                        res.status(401).send("login failed");
                }
        } catch (e) {
                console.log(e);
                res.status(500).send();
        }
});

console.log(users);

app.listen(3000, () => {
        console.log("Server is running on port 3000");
});

// user info is stored in the "users" array only for this current session.
// If the server is restarted, the users array will be empty.
