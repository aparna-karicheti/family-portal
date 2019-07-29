const Staff = require('../models/Staff');

module.exports = {
  createStaff: (req, res) => {
    let staff = new Staff(req.body);

    staff
      .save()
      .then(newStaff => {
        console.log('Staff saved successfully');
        return res.json(newStaff);
      })
      .catch(err => {
        return res.json(err);
      });
  }
};