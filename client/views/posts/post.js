Template.post.helpers({
	domain: function(){
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},

	ownsPost: function(){
		return Meteor.userId() == this.userId;
	},

	upvotedClass: function(){
		var userId = Meteor.userId();
		if(userId && !_.include(this.upvoters, userId)){
			return "btn-primary upvotable";
		} else{
			return "disabled";
		}
	}
});

Template.post.events({
	'click .upvotable': function(e, t){
		e.preventDefault();

		Meteor.call('upvote', this._id, function(error, result){
			if(error){
				throwError(error.reason);
			}
		});
	}
});