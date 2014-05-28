Meteor.publish('posts', function(options){
	return Posts.find({}, options);
});

Meteor.publish('comments', function(id){
	return Comments.find({postId: id});
});

Meteor.publish('notifications', function(){
	return Notifications.find({ userId: this.userId });
});