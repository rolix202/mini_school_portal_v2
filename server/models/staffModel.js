import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"


const staffSchema = new mongoose.Schema({
    staffId: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter your first name!']
    },
    lastName: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter your last name!']
    },
    phoneNo: {
        type: String,
        minlength: [11, 'Phone number must be at least 11 characters long!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email address!'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address!']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    confirmPass: {
        type: String,
        required: [true, 'Please Confirm your password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(val){
                return val === this.password;
            },
            message: "Password and Comfirm password do not match!"
        }
    },
    role: {
        type: [{
            type: String,
            enum: ["admin", "class_teacher", "subject_teacher"]
        }],
        default: ["subject_teacher"]
    },
    assigned_class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    assigned_subjects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        }
    ],
    status: {
        type: String,
        enum: ["active", "in-active"],
        default: "in-active"
    },
    public_img_url: String,
    secured_img_url: String
})

staffSchema.pre("save", async function(next) {
    try {
        if (!this.staffId) {
            this.staffId = `MG-${uuidv4().slice(0,3).toUpperCase()}`; 
        }
        
        if (!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPass = undefined;

        next();
    } catch (error) {
        next(error);
    }
});

const Staff = mongoose.model("Staff", staffSchema)

export default Staff;