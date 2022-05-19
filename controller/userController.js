const User = require('../models/Users');

exports.getUser = (req, res) => {
    User.findById(req.user._id)
      .then(doc => res.status(200).json({
          status : 'success',
          data : {
              data : doc,
          }
      }))
      .catch(err => res.status(404).json(err));
};

  exports.follow = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$push: {followers: req.user._id}, $inc : {'numFollowers' : 1}}, {new: true})
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .then(result => res.status(200).json({
          status: 'success',
          data : {
              data : result
          }
      }))
      .catch(err => res.status(400).json(err));
};


  exports.unfollow = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$pull: {followers: req.user._id}, $inc: {'numFollowers' : -1}}, {new: true})
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json(err));
};