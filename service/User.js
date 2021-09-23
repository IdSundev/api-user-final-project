const userModel = require('../model/User')
const uniqid = require('uniqid')
const platform = require('../platform')

exports.selectUser = async (req,res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    userModel.selectUser(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}

exports.editInformation = async (req,res) => {
    let data = {
        id: req.user.id,
        full_name: req.body.full_name,
        contact: req.body.contact,
        birth_of_date: req.body.birth_of_date,
        gender: req.body.gender,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
    }
   

    if (req.files){
        var file = req.files.profile;
        console.log('INI',file)
        let filename = req.files.profile.name

        var extension = req.files.profile.name.split('.');
        extension = extension[extension.length - 1];
        filename = `${uniqid()}.${extension}`;

        console.log('alamat',platform.projectDir)

        file.mv(platform.projectDir + "/images/" + filename, function(err){
            if(err) console.log(err);
        })

        data.profile= filename
    }

    console.log('lala', data)
    userModel.editInformation(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}