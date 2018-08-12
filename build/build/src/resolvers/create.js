'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _users = require('../Schemas/users');

var _users2 = _interopRequireDefault(_users);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var expiresIn = '1d'; //Tiempo de expiracion
var secret = 'sample123'; //Secret Key


var createToken = exports.createToken = function createToken(email, password) {
    if (!email || !password) {
        //Checar si tiene  alguna informacion confidencial
        return false;
    }

    var user = _users2.default.findOne({ 'email': email }).then(function (user) {
        var compare = new Promise(function (resolve, reject) {
            _bcrypt2.default.compare(password, user.password, function (err, res) {
                if (res) {
                    var payload = {
                        email: user.email,
                        id: user._id
                    };

                    var token = _jsonwebtoken2.default.sign(payload, secret, {
                        expiresIn: expiresIn
                    });

                    resolve(token);
                } else {
                    reject(false);
                }
            });
        });
        return compare;
    }).catch();
    return user;
};