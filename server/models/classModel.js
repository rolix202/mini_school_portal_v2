import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"],
        required: true,
    },
    class_arm: {
        type: String,
        enum: ["Galaxy", "Platinum", "Lincoln", "Rose", "Flamingo", "MaryGold"],
        required: true,
    },
    category: {
        type: String,
        enum: ["junior secondary", "senior secondary"],
        required: true
    },
    class_teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    },
    
});

const Class = mongoose.model("Class", classSchema);

export default Class;
