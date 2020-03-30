const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app, db) => {
    app.get("/users", (req, res) =>
        db.user.findAll().then((result) => res.json(result))
    );

    app.get("/user/:id", (req, res) =>
        db.user.findByPk(req.params.id).then((result) => res.json(result))
    );

    app.post("/user", async (req, res) => {
        const body = req.body
        let user

        console.log(req.body)

        await db.user.findOne({
            where: { username: req.body.Username }
        }).then((result) => {
            user = result
        })

        if (!user) {
            await bcrypt.hash(body.Password, saltRounds, function (err, hash) {

                db.user.create({
                    firstName: req.body.FirstName,
                    lastName: req.body.LastName,
                    email: req.body.Email,
                    username: req.body.Username,
                    password: hash,
                }).then((result) => res.json(result))

            });

        } else {
            res.status(500).send("Username already exist")
        }
    });

    app.post("/user/login", async (req, res) => {
        const body = req.body
        let user

        await db.user.findOne({
            where: { username: req.body.Username }
        }).then((result) => user = result)

        console.log(user)


        await bcrypt.compare(body.Password, user.dataValues.password, function (err, result) {
            if (result === true) {
                res.status(200).send("OK")
            } else {
                res.status(500).send("Wrong Password")
            }
        });

    });

    app.put("/user/:id", async (req, res) => {
        const body = req.body
        await bcrypt.hash(body.Password, saltRounds, function (err, hash) {

            db.user.update({
                firstName: req.body.FirstName,
                lastName: req.body.LastName,
                email: req.body.Email,
                username: req.body.Username,
                password: hash,
            },
                {
                    where: {
                        id: req.params.id
                    }
                }).then((result) => res.json(result))

        });
    });

    app.delete("/user/:id", (req, res) =>
        db.user.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result))
    );
}
