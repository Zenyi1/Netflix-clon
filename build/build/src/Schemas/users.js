'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var SALT_WORK_FACTOR = 10;
//importe mongoose

var Schema = _mongoose2.default.Schema;
//inicialize un schema de mongoose

var UserSchema = new Schema({
    'name': {
        type: String,
        require: true
    },
    'lastName': {
        type: String,
        require: true
    },
    'email': {
        type: String,
        require: true
    },
    'password': {
        type: String,
        require: true
    },
    'birthDate': {
        type: Date,
        require: false
    },
    'phone': {
        type: String,
        require: true
    },
    'isPremium': {
        type: Boolean,
        default: false,
        require: false
    }
}, { 'collection': 'users', timestamps: true });
//cree el Schema de mongoose y le agrege timestamps para saber cuando se creo el usuario

UserSchema.pre('save', function (next) {
    var user = this;
    //SOLO SI EL USUARIO MPDIFICA O CREA UNA NUEVA CONTRASENA
    if (!user.isModified('password')) return next();

    _bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        _bcrypt2.default.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

exports.default = _mongoose2.default.model('users', UserSchema);
//exporte el Schema