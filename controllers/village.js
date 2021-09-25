const Village = require("../models/villageModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let data = {
    id_sub_district: req.query.district,
  };
  let selectAll = Village.selectAll(data);
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};