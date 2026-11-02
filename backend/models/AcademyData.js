const mongoose = require('mongoose');
const academyDataSchema = new mongoose.Schema({
  key: {type:String, default:'main', unique:true},
  students: {type:[mongoose.Schema.Types.Mixed], default:[]},
  attendance: {type:[mongoose.Schema.Types.Mixed], default:[]},
  payments: {type:[mongoose.Schema.Types.Mixed], default:[]},
  exams: {type:[mongoose.Schema.Types.Mixed], default:[]},
  expenses: {type:[mongoose.Schema.Types.Mixed], default:[]},
  inventory: {type:[mongoose.Schema.Types.Mixed], default:[]}
},{timestamps:true, minimize:false});
module.exports = mongoose.model('AcademyData', academyDataSchema);
