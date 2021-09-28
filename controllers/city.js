const City = require("../models/cityModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let data = {
    id_province: req.query.province,
  };
  let selectAll = City.selectAll(data);
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};