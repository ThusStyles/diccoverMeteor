Template.newComment.events({
	'submit form': function(e, template){

		e.preventDefault();

		var $body = $(e.target).find('[name=body]');
		var comment = {
			body: $body.val(),
			postId: template.data._id
		}

		Meteor.call('newComment', comment, function (error, result) {
			if(error)
				throwError(error.reason);
			else
				$body.val('');
		});
	}
})