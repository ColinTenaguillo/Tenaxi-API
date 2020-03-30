module.exports = (app, db) => {
    /**
     * @swagger
     * /stages:
     *  get:
     *      description: Get all stages
     *      responses:
     *          '200': return array
     */
    app.get("/stages", (req, res) =>
        db.stage.findAll().then((result) => res.json(result))
    );

    /**
     * @swagger
     * /stage/:id:
     *  get:
     *      description: Get stage by id
     *      properties:
     *        id:
     *          type: integer
     *          description: The user ID.
     *      responses:
     *          '200': return array
     */
    app.get("/stage/:id", (req, res) =>
        db.stage.findByPk(req.params.id).then((result) => res.json(result))
    );

    app.post("/stage", (req, res) => {
        const body = req.body
        db.stage.create({
            title: body.title,
            content: body.content,
        }).then((result) => res.json(result))
    });

    app.put("/stage/:id", (req, res) => {
        const body = req.body
        db.stage.update({
            title: body.title,
            content: body.content,
        },
            {
                where: {
                    id: req.params.id
                }
            }).then((result) => res.json(result))
    });

    app.delete("/stage/:id", (req, res) =>
        db.stage.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result))
    );
}