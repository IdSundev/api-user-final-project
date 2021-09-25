const Address = require("../models/addressModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let data = await {
    id_user: req.query.user
  };
  let selectAll = Address.selectAll(data);
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};

exports.add = async (req, res) => {
  let data = await {
    id_user: req.body.id_user,
    id_village: req.body.id_village,
    detail_address: req.body.detail_address,
    other_detail: req.body.other_detail,
    pin_as: req.body.pin_as,
    full_name: req.body.full_name,
    contact: req.body.contact
  };
  let result = Address.insert(data);
  result
    .then((result) => {
      res.json({
        status: 200,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    });
  return;
};

exports.setdefault = async(req,res) => {
  let data = await {
    id_user: req.query.user,
    id_address: req.query.address
  }
  Address.setDefaultAllFalse(data).then(() => {
    let updateSetDefault = Address.updateSetDefault(data);
    updateSetDefault.then(() => {
      res.json({
        status: 200,
        success: true,
      });
    });
  })
}