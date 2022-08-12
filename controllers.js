import { Router } from "express";
import { ActivityGroup, TodoItems, ResponseFormat } from "./models.js";

export const activityRouter = Router();
export const todoRouter = Router();


activityRouter.get("", async (req, res) => {
    try {
        const email = decodeURI(req.query.email);
        const activity = await ActivityGroup.findAll({where: {email: email, deleted_at: null}});

        return res.status(200).send(new ResponseFormat("Success", "Success", activity));
    } catch (e) {
        console.log(e.message);
        console.log(e);
        return res.status(500).send(new ResponseFormat("Failed", e.message, ""));
    }
});

activityRouter.post("", async (req, res) => {
    try {
        if (req.body.title == null) {
            return res.status(400).send(new ResponseFormat("Bad Request", "title cannot be null", {}));
        }
        const title = req.body.title;
        const email = req.body.email;


        const activity = await ActivityGroup.create({
            title: title,
            email: email,
            created_at: new Date(),
            updated_at: new Date()
        });

        return res.status(201).send(new ResponseFormat("Success", "Success", activity));
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(new ResponseFormat("Failed", e.message, ""));
    }
});

activityRouter.get("/:id", async (req, res) => {
    try {  
        const id = req.params.id;

        const activity = await ActivityGroup.findOne({where: {id: id, deleted_at: null}});
        if (activity == null) {
            return res.status(404).send(new ResponseFormat("Not Found", `Activity with ID ${id} Not Found`, {}));
        }

        return res.status(200).send(new ResponseFormat("Success", "Success", activity));
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(new ResponseFormat("Failed", e.message, ""))
    }
});

activityRouter.delete("/:id", async (req, res) => {
    var id = req.params.id;
    if (req.query.id) {
        if (req.query.id !== 0) {
            var id = req.query.id.split(",");
        }
    }
    const activity = await ActivityGroup.findOne({where: {id: id, deleted_at: null}})
    if (activity == null) {
        return res.status(404).send(new ResponseFormat("Not Found", `Activity with ID ${id} Not Found`, {}));
    }
    ActivityGroup.update({deleted_at: new Date()}, {where: {id: id, deleted_at: null}})
    .then(async () => {
        return res.status(200).send(new ResponseFormat("Success", `Activity with ID ${id} Not Found`, {}));
    })
    .catch((e) => {return res.status(500).send(new ResponseFormat("Failed", e.message, {}));});
});

activityRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    ActivityGroup.update({title: title, updated_at: new Date()}, {where: {id: id, deleted_at: null}})
    .then(async () => {
        const activity = await ActivityGroup.findOne({where: {id: id, deleted_at: null}});
        if (activity == null) {
            return res.status(404).send(new ResponseFormat("Not Found", `Activity with ID ${id} Not Found`, ""));
    }
        return res.status(200).send(new ResponseFormat("Success", "Success", activity));
    })
    .catch(async (e) => {return res.status(500).send(new ResponseFormat("Failed", e.message, ""));});
});


todoRouter.post("", async (req, res) => {
    try {
        if (req.body.title == null) {
            return res.status(400).send(new ResponseFormat("Bad Request", "title cannot be null", {}));
        } if (req.body.activity_group_id == null) {
            return res.status(400).send(new ResponseFormat("Bad Request", "activity_group_id cannot be null", {}));
        }
        const activity_group_id = req.body.activity_group_id;
        const title = req.body.title;


        const todo = await TodoItems.create({
            activity_group_id: activity_group_id,
            title: title,
            created_at: new Date(),
            updated_at: new Date()
        });

        return res.status(201).send(new ResponseFormat("Success", "Success", todo));
    } catch (e) {
        console.log(e);
        return res.status(500).send(new ResponseFormat("Failed", e.message, ""))
    }
});

todoRouter.get("", async (req, res) => {
    try {
        const activity_group_id = req.query.activity_group_id;

        const todo = await TodoItems.findAll({where: {activity_group_id: activity_group_id, deleted_at: null}});
        if (todo == null) {
            return res.status(404).send(new ResponseFormat("Failed", `Todo Item with Activity Group ID ${activity_group_id} is Not Found`));
        }
        return res.status(200).send(new ResponseFormat("Success", "Success", todo));
    } catch (e) {
        console.log(e);
        return res.status(500).send(new ResponseFormat("Failed", e.message, ""))
    }
});

todoRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const todo = await TodoItems.findOne({where: {id: id, deleted_at: null}});
        if (todo) {
            return res.status(200).send(new ResponseFormat("Success", "Success", todo));
        } else {
            return res.status(404).send(new ResponseFormat("Not Found", `Todo with ID ${id} Not Found`, ""));
        } ;
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(new ResponseFormat("Failed", e.message, ""));
    }
});

todoRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    req.body.update_at = new Date();

    TodoItems.update(req.body, {where: {id: id, deleted_at: null}})
    .then(async () => {
        const todo = await TodoItems.findOne({where: {id: id, deleted_at: null}});
        if (todo) {
            return res.status(200).send(new ResponseFormat("Success", "Success", todo));
        } else {   
            return res.status(404).send(new ResponseFormat("Not Found", `Todo with ID ${id} Not Found`, ""));
        }
    })
    .catch(async (e) => {return res.status(500).send(new ResponseFormat("Failed", e.message, ""));});
});

todoRouter.delete("/:id", async (req, res) => {
    var id = req.params.id;
    if (req.query.id) {
        if (req.query.id !== 0) {
            var id = req.query.id.split(",");
        }
    }

    const todo = await TodoItems.findOne({where: {id: id, deleted_at: null}});
    if (todo == null) {
        return res.status(404).send(new ResponseFormat("Not Found", `Todo with ID ${id} Not Found`, ""));
    }

    TodoItems.update({deleted_at: new Date()}, {where: {id: id, deleted_at: null}})
    .then(async () => {
        return res.status(200).send(new ResponseFormat("Success", "Success", {}));
    })
    .catch((e) => {return res.status(500).send(new ResponseFormat("Failed", e.message, {}));});
});