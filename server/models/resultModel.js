import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },

  subject: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subject', 
    required: true 
  },

  term: {
    type: String,
    enum: ["1st Term", "2nd Term", "3rd term"],
    require: true
  },

  session: {type: String, required: true},

  assessments:{
    firstCA: {type: Number, default: null},
    secondCA: {type: Number, default: null},
    thirdCA: {type: Number, default: null},
    exam: {type: Number, default: null}
  },

  totalScore: {
    type: Number,
    default: function() {
      const { firstCA, secondCA, thirdCA, exam } = this.assessments
      return (firstCA || 0) + (secondCA || 0) + (thirdCA || 0) + (exam || 0);
    }
  }
});

const Result = mongoose.model('Result', resultSchema);

export default Result