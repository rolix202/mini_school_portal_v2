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

  midTermTotal: {
    type: Number,
    default: function(){
      const { firstCA, secondCA } = this.assessments;
      return (firstCA || 0) + (secondCA || 0);
    }
  },

  finalTermTotal: {
    type: Number,
    default: function(){
      const { firstCA, secondCA, thirdCA, exam } = this.assessments;
      return (firstCA || 0) + (secondCA || 0) + (thirdCA || 0) + (exam || 0);
    }
  },
});

resultSchema.pre('save', function (next){
  this.midTermTotal = (this.assessments.firstCA || 0) + (this.assessments.secondCA || 0);
  this.finalTermTotal = (this.assessments.firstCA || 0) + (this.assessments.secondCA || 0) + (this.assessments.thirdCA || 0) + (this.assessments.exam || 0);
  next();
})

const Result = mongoose.model('Result', resultSchema);

export default Result