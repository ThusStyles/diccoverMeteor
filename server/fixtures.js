if (Posts.find().count() === 0) {

	Posts.insert({
		title: 'Introducing Telescope',
		author: 'Sacha Greif',
		url: 'http://sachagreif.com/introducing-telescope/',
		submitted: new Date().getTime(),
		commentsCount: 0,
		votes: 0,
		upvoters: []
	});

	Posts.insert({
		title: 'Meteor',
		author: 'Tom Coleman',
		url: 'http://meteor.com',
		submitted: new Date().getTime(),
		commentsCount: 0,
		votes: 0,
		upvoters: []
	});

	Posts.insert({
		title: 'The Meteor Book',
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com',
		submitted: new Date().getTime(),
		commentsCount: 0,
		votes: 0,
		upvoters: []
	});
	
}