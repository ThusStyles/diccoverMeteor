Comments = new Meteor.Collection('comments');

Meteor.methods({
	newComment: function(comment){
		var user = Meteor.user(),
		post = Posts.findOne(comment.postId);

		if(!user){
			throw new Metoer.Error(401, 'You need to be logged in to comment');
		}

		if(!post){
			throw new Meteor.Error(422, 'You must comment on a post');
		}

		if(!comment.body){
			throw new Meteor.Error(422, 'You must provide a comment body');
		}

		newComment = _.extend(_.pick(comment, 'body', 'postId'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		Posts.update(comment.postId, {$inc: { commentsCount: 1 } });
		
		createCommentNotification(newComment);

		return Comments.insert(newComment);
	}
});