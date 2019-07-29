const Family = require('../models/Family');

module.exports = {
  updateFamilyAddress: (req, res) => {
    Family.findOneAndUpdate(
      {
        _id: req.params.familyId
      },
      {
        $set: {
          address: req.body.address
        }
      },
      {
        new: true
      }
    )
      .then(updatedFamily => {
        console.log(updatedFamily);
        return res.json(updatedFamily);
      })
      .catch(err => {
        return res.json(err);
      });
  }
};