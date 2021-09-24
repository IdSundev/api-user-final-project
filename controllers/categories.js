const Categories = require("../models/categoriesModel");

exports.all = async (req, res) => {
  let selectAll = Categories.selectAll();
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};