import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  subject_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subject', 
    required: true 
  },
  cat1: { type: Number, default: 0 },
  cat2: { type: Number, default: 0 },
  cat3: { type: Number, default: 0 },
  exam: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
});

const Result = mongoose.model('Result', resultSchema);

export default Result