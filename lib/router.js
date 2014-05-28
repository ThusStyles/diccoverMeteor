PostListController = RouteController.extend({
	template: 'postsList',
	increment: 5,

	limit: function(){
		return parseInt(this.params.postsLimit) || this.increment;
	},

	findOptions: function(){
		return {sort: {submitted: -1}, limit: this.limit() };
	},

	waitOn: function(){
		return Meteor.subscribe('posts', this.findOptions());
	},
	posts: function(){
		return Posts.find({}, this.findOptions());
	},

	data: function(){
		var hasMore = this.posts().count() === this.limit();
		var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
		return {
			posts: this.posts(),
			nextPath: hasMore ? nextPath : null
		};
	}
});

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [Meteor.subscribe('notifications')]; }
});

Router.map(function(){
	this.route('postPage', {
		path: '/posts/:_id',
		data: function(){ return Posts.findOne(this.params._id); },
		waitOn: function(){ return Meteor.subscribe('comments', this.params._id); }
	});

	this.route('newPost', {
		path: '/post/new',
		disableProgress: true
	});

	this.route('editPost', {
		path: 'posts/:_id/edit',
		data: function(){ return Posts.findOne(this.params._id); },
	});

	this.route('postsList', {
		path: '/:postsLimit?',
		controller: PostListController
	});
});

var requireLogin = function(pause){
	if (!Meteor.user()){
		if(Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render("accessDenied");

		pause();
	}
}

Router.onBeforeAction(function(){ clearErrors() });
Router.onBeforeAction(requireLogin, {only: 'newPost'})
Router.onBeforeAction('loading');