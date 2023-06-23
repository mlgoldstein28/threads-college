import express from "express";
import { ObjectId } from "mongodb";
import db from '../db/conn.mjs';

const router = express.Router();

//All Records
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//Single Record
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) {
        res.send("Not found").status(404);
    } else {
        res.send(result).status(200);
    }
});

//Create a record
router.post("/", async (req, res) => {
    let newDocument = {
        date: req.body.date,
        name: req.body.name,
        item: req.body.item,
        size: req.body.size,
        school: req.body.school,
        vendor: req.body.vendor,
        paid: req.body.paid,
        employee: req.body.employee,
        dateReceived: req.body.dateReceived,
        contactedCust: req.body.contactedCust,
        pickedUp: req.body.pickedUp,
    };
    let collection = await db.collection('records');
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
})

//Update record
router.patch('/:id', async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            date: req.body.date,
            name: req.body.name,
            item: req.body.item,
            school: req.body.school,
            size: req.body.size,
            vendor: req.body.vendor,
            paid: req.body.paid,
            employee: req.body.employee,
            dateReceived: req.body.dateReceived,
            contactedCust: req.body.contactedCust,
            pickedUp: req.body.pickedUp,
        }
    }
    let collection = await db.collection('records');
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

//delete a record
    //

export default router;