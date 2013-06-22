module.exports = function(lang) {

	console.log('------------------------------------------------');
	console.log('[INFO]	Welcome to the home-search app launcher');
	console.log('------------------------------------------------');
	
	var available_languages	= ['fr', 'en'];
	var default_language	= 'en';
	
	if(available_languages.indexOf(lang) === -1) {
		console.log('[WARN]	"'+ lang +'" is not an available language');
		lang = default_language;
	}
	
	console.log('[LOG]	App language sets to "'+ lang +'"');

	return lang;
};