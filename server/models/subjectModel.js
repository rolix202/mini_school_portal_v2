import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  subject_teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff', 
  }
});

const Subject =  mongoose.model('Subject', subjectSchema);

export default Subject
