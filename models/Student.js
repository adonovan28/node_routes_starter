const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    currentCollege: {
        type: String,
        required: true,
    },
});

model.exports = mongoose.model("students", StudentSchema);