const Province = require("../models/provinceModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let selectAll = Province.selectAll();
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};