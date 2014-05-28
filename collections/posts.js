Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function (userId, doc, fields, modifier) {
		return( _.without(fields, 'url', 'title', 'message').length > 0);
	}
});

Meteor.methods({
	newPost: function(post){
		var user = Meteor.user(),
		postWithSameLink = Posts.findOne({url: post.url});

		if( !user )
			throw new Meteor.Error(401, "You need to login to post new stories");

		if( postWithSameLink && post.url )
			throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);

		if( !post.url || !post.title )
			throw new Meteor.Error(422, "Please fill in a title and url");

		var post = _.extend(_.pick(post, 'url', 'message', 'title'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		var postId = Posts.insert(post);

		return postId
	},
	upvote: function(postId){

		var user = Meteor.user(),
		post = Posts.findOne(postId);

		if( !user ){
			throw new Meteor.Error(401, "You need to login to vote on posts");
		}

		Posts.update({
			_id: postId,
			upvoters: { $ne: user._id }
		}, {
			$addToSet: { upvoters: user._id },
			$inc: { votes: 1 }
		});
	}
});