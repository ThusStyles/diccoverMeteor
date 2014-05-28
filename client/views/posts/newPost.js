Template.newPost.events({
	'submit form': function(e){
		e.preventDefault();

		var post = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			url: $(e.target).find('[name=url]').val()
		}

		Meteor.call('newPost', post, function (error, result) {
			if(error){
				throwError(error.reason);

				if(error.error === 302){
					Router.go('postPage', {_id: error.details});
				}
			} else{
				Router.go('postPage', {_id: result})
			}
		});
	},

	'input #message': function(e, t){
		var message = $('#message').val();
		Session.set('message', message );
	},
	'input #title': function(e, t){
		var title = $('#title').val();
		Session.set('title', title );
	},
	'input #url': function(e, t){
		var url = $('#url').val();
		var a = document.createElement('a');
		a.href = url;
		var domain = a.hostname;

		Session.set('domain', domain);
		Session.set('url', url );
	}
});

Template.newPost.helpers ({
	message: function(){
		return Session.get('message');
	},
	title: function(){
		return Session.get('title');
	},
	url: function(){
		return Session.get('url');
	},
	domain: function(){
		return Session.get('domain');
	},
	author: function(){
		return Meteor.user().username;
	}
});

Template.newPost.rendered = function () {
	Session.set('url', null);
	Session.set('message', 'defaul message');
	Session.set('domain', "no-domain.com");
	Session.set('title', 'blank title');


};