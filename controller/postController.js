const Post = require('../models/Posts');

exports.getAllPostByUser = (req, res) => {
    Post.find({user: req.user._id})
    .sort({createdAt: -1})
    .then(doc => res.status(200).json({
        status : 'success',
        data : {
            // id : doc[0]._id,
            // title : doc[0].title,
            // description : doc[0].body,
            // createdAt : doc[0].updatedAt,
            // comments : doc[0].comments,
            // likes : doc[0].numLikes
            data : doc
        }
    }
    ))
    .catch(err => res.status(500).json({
        status : 'success',
        data : {
            data : err
        }
    }));
}


exports.getPost = (req, res) => {
    Post.findById(req.params.id)
    .then(doc => res.status(200).json({
        status : 'success',
        data : {
            data : doc
        }
    }))
    .catch(err => res.status(400).json({
        status : 'fail',
        data : err
    }))
}

// API for creating a post.

exports.createNewPost = (req, res, next) => {
      const post = new Post(req.body);
      post.user = req.user;
      post.save()
        .then(doc => res.status(201).json({
            status : 'success',
            data : {
                id : doc._id,
                title : doc.title,
                description : doc.body,
                createdTime : doc.createdAt
            }
        }))
        .catch(err => res.status(400).json({
            status: 'fail',
            data : err
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
    Post.findByIdAndUpdate(req.params.id, {$push: {likes: req.user._id}, $inc : {'numLikes' : 1}}, {new: true})
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
    Post.findByIdAndUpdate(req.params.id, {$pull: {likes: req.user._id}, $inc : {'numLikes' : -1}}, {new: true})
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


exports.addcomment = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, {$push: {comments: {comment : req.body.comment, commenter : req.user._id}}, $inc : {'numComments' : 1}}, {new: true})
      .populate('user', '_id name')
      .then(doc => res.status(200).json({
          status: 'success',
          data: {
              data : doc
          }
      }))
      .catch(err => res.status(400).json({
          status: 'fail',
          data: {
              data: err
          }
      }));
};


