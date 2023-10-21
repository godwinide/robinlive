const Table = require("../model/Table");
const Result = require("../model/Result");
const router = require("express").Router();


router.get("/get-tables", async (req, res) => {
    try {
        const tables = await Table.find();
        return res.status(200).json({
            tables
        });
    } catch (err) {
        console.log(err);
    }
});

router.get("/get-results/:tableId", async (req, res) => {
    try {
        const { tableId } = req.params;
        const { duration } = req.query;
        let results = [];
        if (duration && duration > 0) {
            const comapreTime = Date.now() - (duration * 60 * 60 * 1000);
            results = await Result.find({ tableId, date: { $gt: comapreTime } });
        } else {
            results = await Result.find({ tableId });
        }
        return res.status(200).json({
            results
        });
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;