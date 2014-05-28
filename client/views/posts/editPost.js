Template.editPost.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPostId = this._id;

		var post = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			url: $(e.target).find('[name=url]').val()
		}

		Posts.update(currentPostId, {$set: post}, function(error){
			if(error)
				alert(error.reason);
			else
				Router.go('postPage', {_id: currentPostId});
		});
	},

	'click .delete': function(e){
		e.preventDefault();

		if(confirm("Are you sure you want to delete this?")){
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});