PostListController = RouteController.extend({
	template: 'postsList',
	increment: 5,

	limit: function(){
		return parseInt(this.params.postsLimit) || this.increment;
	},

	findOptions: function(){
		return {sort: this.sort, limit: this.limit() };
	},

	waitOn: function(){
		return Meteor.subscribe('posts', this.findOptions());
	},
	posts: function(){
		return Posts.find({}, this.findOptions());
	},

	data: function(){
		var hasMore = this.posts().count() === this.limit();
		return {
			posts: this.posts(),
			nextPath: hasMore ? this.nextPath() : null
		};
	}
});

NewPostsListController = PostListController.extend({
	sort: { submitted: -1, _id: -1},
	nextPath: function(){
		return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment});
	}
});

BestPostsListController = PostListController.extend({
	sort: { votes: -1, submitted: -1, _id: -1},
	nextPath: function(){
		return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment});
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
		waitOn: function(){ return [Meteor.subscribe('singlePost', this.params._id), Meteor.subscribe('comments', this.params._id)]; }
	});

	this.route('newPost', {
		path: '/post/new',
		disableProgress: true
	});

	this.route('editPost', {
		path: 'posts/:_id/edit',
		data: function(){ return Posts.findOne(this.params._id); },
	});

	this.route('newPosts', {
		path: "/new/:postsLimit?",
		controller: NewPostsListController
	});

	this.route('bestPosts', {
		path: "/best/:postsLimit?",
		controller: BestPostsListController
	});

	this.route('home', {
		path: '/:postsLimit?',
		controller: NewPostsListController
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