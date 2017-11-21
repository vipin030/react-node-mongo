var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema =new Schema({
	reason: {type: String,required:true},
	price: {type: Number, required:true},
	created_at:Date,
	updated_at:Date
});

var Expense = mongoose.model('Expense',expenseSchema);

module.exports = Expense;