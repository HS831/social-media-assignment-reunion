const Post = require('../models/Posts');

// API for creating a post.

exports.createNewPost = (req, res, next) => {
      const post = new Post(req.body);
      post.user = req.user;
      post.save()
        .then(doc => res.status(201).json({
            status : 'success',
            data : {
                data : doc
            }
        }))
        .catch(err => res.status(400).json({
            status: 'fail',
            data : 'Invalid request'
        }));
    
};

// API to DELETE Post

exports.deletePost = (req, res) => {
    const deletePost = Post.findOneAndDelete({_id: req.params.id});
    
    deletePost
      .then(doc => res.status(200).json({
          status: 'success',
          data: 'deleted!!'
      }))
      .catch(err => res.status(400).json({
          status: 'fail',
          data : {
              data: err
          }
      }));
};

// Controller function for Liking the post..

exports.likePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.user._id}}, {new: true})
      .populate('user', '_id name')
      .then(doc => res.status(200).json({
          status: 'success',
          data : 'Post liked successfully!!'
      }))
      .catch(err => res.status(400).json({
          status: 'fail',
          data : {
              data : err
          }
      }));
  };
  
 // Controller function for unliking the post..

  exports.unlikePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.user._id}}, {new: true})
      .populate('user', '_id name')
      .then(doc => res.status(200).json({
          status: 'success',
          data: 'Post Unliked successfully!!!'
      }))
      .catch(err => res.status(400).json({
          status: 'fail',
          data: {
              data: err
          }
      }));
  };


