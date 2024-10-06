import mongoose from "mongoose";
import Class from "./classModel.js";
import { v4 as uuidv4 } from "uuid"

const studentSchema = new mongoose.Schema({
    studentID: {
        type: String,
        uniqe: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    otherNames: {
        type: String,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Subject"
        }
    ],
    results: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Result' 
        }
    ],
    status: {
        type: String,
        enum: ["active", "in-active"],
        default: "active"
    },
    public_img_url: String,
    secured_img_url: String
})

studentSchema.pre("save", async function(next){
    try {
        const classInfo = await Class.findById(this.class)

        if (!classInfo){
            throw new Error("Class not found")
        }
        const className = classInfo.name;
        const classArm = classInfo.class_arm;

        const classPrefix = className.charAt(0).toUpperCase();
        const classNumber = className.slice(-1);
        const armPrefix = classArm.charAt(0).toUpperCase();

        this.studentID = `${classPrefix}${classNumber}-${uuidv4().slice(0,2).toUpperCase()}${armPrefix}`;

        next()
    } catch (error) {
        next(error)
    }
})


const Student = mongoose.model("Student", studentSchema)

export default Student;