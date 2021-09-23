const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');



// exports.Encode = (data) => {
//     return jwt.sign(data, jwtConfig.secretKey);
// };

const createJWTToken = (payload) => {
	return jwt.sign(payload, jwtConfig.secretKey, { expiresIn: "24h" });
};

const checkToken = (req, res, next) => {
	

	if (req.method !== "OPTIONS") {
        const token = req.body.token
        console.log('ini token', token)
		jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: err.message,
					status: "Unauthorized",
				});
			}

			req.user = decoded;
            console.log('asdsas',req.user)
			next();
		});
	}
};

const verifyToken = (req, res, next) => {

	console.log(req.body)
	console.log(req.method)
	if (req.method !== "OPTIONS") {
        const token = req.body.token
        console.log('ini token', token)
		jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: err.message,
					status: "Unauthorized",
				});
			}

			req.user = decoded;
            console.log('asdsas',req.user)
			next();
		});
	}
};

module.exports = {
	checkToken,
    createJWTToken,
	verifyToken
};