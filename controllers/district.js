const District = require("../models/districtModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let data = {
    id_city: req.query.city,
  };
  let selectAll = District.selectAll(data);
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};