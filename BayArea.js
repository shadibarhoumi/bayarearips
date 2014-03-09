// creates a new database table to hold all of the posts
// that our users will submit to our site
Posts = new Meteor.Collection("posts");
// this represents our comments on a post
Comments = new Meteor.Collection("comments");

if (Meteor.isClient) {
  Template.newPost.events({
    'click #submit': function() {
      var postName = $('#name').val();
      var postDescription = $('#description').val();
      var postTradeFor = $('#trade-for').val();
      if (postName === ''
        || postDescription === ''
        || postTradeFor === '' ) {
        alert("Please fill all fields of the form!");
      } else {
        // insert into our Posts database
        Posts.insert({
          name: postName,
          description: postDescription,
          tradeFor: postTradeFor});
        // clear out the form fields
        $('#name').val('');
        $('#description').val('');
        $('#trade-for').val('');
      }
    }
  });

  Template.newComment.events({
    'keypress .new-comment-body': function(event) {
      console.log("pressed muthafucking enter key");
      // if user pressed enter
      if (event.keyCode === 13) {
        var commentName = $(event.target).prev().val();
        var commentBody = $(event.target).val();
        // get id of post which this new comment will be attached to
        var commentPostId = $(event.target).parent().parent().attr('id');
        // insert into our Comments database
        Comments.insert({
          name: commentName,
          body: commentBody,
          postId: commentPostId
        });
         // clear out the comment fields
        $('.new-comment-name').val('');
        $('.new-comment-body').val('');
      }
     
    }
  });

  Template.allComments.comments = function(parentPostId) {
    console.log("post id parent: " + parentPostId);
    return Comments.find({ postId: parentPostId }).fetch();
  };

  Template.allPosts.posts = function() {
    return Posts.find().fetch();
  };



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
