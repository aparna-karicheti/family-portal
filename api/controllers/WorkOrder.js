const WorkOrder = require('../models/WorkOrder');

module.exports = {
  createWorkOrder: (req, res) => {
    let workorder = new WorkOrder(req.body);

    workorder
      .save()
      .then(newWorkOrder => {
        console.log('Workorder saved successfully');
        return res.json(newWorkOrder);
      })
      .catch(err => {
        return res.json(err);
      });
  }
};