const { Schema, model } = require("mongoose");

const TableSchema = new Schema({
    tableId: {
        type: String,
        required: true
    },
    tableName: {
        type: String,
        required: true
    },
    trialPostion: {
        type: Number,
        required: false,
        default: 1
    },
    lastUpdated: {
        type: Number,
        required: true
    }
});

const Table = model("Table", TableSchema);

module.exports = Table;

