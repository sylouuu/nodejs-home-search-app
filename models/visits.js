module.exports = function(mongoose) {
	var collection = 'visits';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
		id: ObjectId,
		date: String,
		type: Number,
		agency: String,
		city: String,
		url: String,
		note: Number
	});

	return mongoose.model(collection, schema);
};