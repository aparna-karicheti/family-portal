const Activities = require('../models/Activities');

const Resident = require('../models/Resident');

module.exports = {
  createActivity: (req, res) => {
    let activity = new Activities(req.body);

    activity
      .save()
      .then(newActivity => {
        console.log('Activity saved correctly');
        return res.json(newActivity);
      })
      .catch(err => {
        return res.json(err);
      });
  },

  addResidentToActivity: (req, res) => {
    Resident.findOneAndUpdate(
      {
        _id: req.params.residentId
      },
      {
        $push: {
          activities: req.params.activityId
        }
      },
      {
        new: true
      }
    )
      .then(updatedResident => {
        console.log('Activity saved on Resident ');
        return res.json(updatedResident);
      })
      .catch(err => {
        return res.json(err);
      });
  }
};