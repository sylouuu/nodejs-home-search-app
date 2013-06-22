module.exports = function(lang){
	var available_languages = ['fr', 'en'];

	return (available_languages.indexOf(lang) !== -1) ? lang : 'fr';
};