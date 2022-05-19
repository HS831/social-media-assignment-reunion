const User = require('../models/Users');

exports.getUser = (req, res) => {
    User.findById(req.user._id)
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .then(doc => res.status(200).json({
          status : 'success',
          data : {
              data : doc,
          }
      }))
      .catch(err => res.status(404).json(err));
};

