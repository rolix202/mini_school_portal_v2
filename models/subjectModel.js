import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  subject_teacher_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff', 
  }
});

const Subject =  mongoose.model('Subject', subjectSchema);

export default Subject
