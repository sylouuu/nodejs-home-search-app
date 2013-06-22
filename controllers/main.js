module.exports = function(app, models, pages) {

	// Affichage de la page d'accueil
	app.get('/', function(req, res) {
		// Récupération des visites
		models.visits.find(null, function(err, data) {
			if(err) { throw err; }

			res.render('index', {
				common: pages.common,
				home: pages.home,
				visits: data
			});

		});
	})
	
	// Affichage du formulaire
	.get('/add', function(req, res) {
	
		// Données
		var visit = {
			id:	0,
			date: '',
			type: '',
			agency: '',
			city: '',
			url: '',
			note: ''
		};
		
		// Vue
		res.render('visit', {
			common: pages.common,
			page: pages.visit,
			visit: visit
		});
	})
	
	// Affichage du formulaire
	.get('/visit/:id', function(req, res) {
		if(req.params.id != '') {
			models.visits.findById(req.params.id, function(err, data) {
				if(err) {
					res.redirect('/404');
				} else {
					// Données
					var visit = {
						id:	data._id,
						date: data.date,
						type: data.type,
						agency: data.agency,
						city: data.city,
						url: data.url,
						note: data.note
					};
					
					// Vue
					res.render('visit', {
						common: pages.common,
						page: pages.visit,
						visit: visit
					});
				}
			});
		}
	})
	
	// Affichage du formulaire
	.post('/submit', function(req, res) {
	
		var my_visit = new models.visits({
			date: req.body.visit_date,
			type: req.body.visit_type,
			agency: req.body.visit_agency,
			city: req.body.visit_city,
			url: req.body.visit_url,
			note: req.body.visit_note
		});
		
		// Si c'est un ajout
		if(req.body.id == 0) {
			my_visit.save(function(err) {
				if(err) { throw err; }
				
				console.log('added visit');
				
				res.redirect('/');
			});
		} else { // Modification
			models.visits.findById(req.body.id, function(err, data) {
				if(err) {
					res.redirect('/404');
				} else {
					console.log(req.body.id +' existe');
					
					var upsertData = my_visit.toObject();
					
					delete upsertData._id;
					
					models.visits.update({ _id: req.body.id }, upsertData, function(err) {
						if(err) { throw err; }
						
						console.log('updated visit: '+ req.body.id);
						
						res.redirect('/');
					});
				}
			});
		}
	})
	
	// Suppression
	.get('/remove/:id', function(req, res) {
		if(req.params.id != '') {
			models.visits.findById(req.params.id, function(err, data) {
				if(err) {
					res.redirect('/404');
				} else {
					models.visits.findByIdAndRemove(req.params.id, function(err, data) {
						if(err) { throw err; }

						res.redirect('/');
					});
				}
			});
		}
	})

	// Erreur 404
	.use(function(req, res, next) {
		res.render('404', {
			common: pages.common,
		});
	});
	
};