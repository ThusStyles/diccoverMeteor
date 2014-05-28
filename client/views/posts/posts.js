Template.postsList.helpers({
	postsWithRank: function(){
		this.posts.rewind();
		return this.posts.map(function(post, index, cursor){
			posts._rank = index;
			return post;
		});
	}
})