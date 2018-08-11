'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var MovieSchema = new Schema({
    'name': {
        type: String,
        require: true
    },
    'genre': {
        type: Schema.Types.ObjectId,
        ref: 'genres',
        require: true
    },
    'synopsys': {
        type: String,
        require: true
    },
    'cast': {
        type: String,
        require: false
    },
    'year': {
        type: Number,
        require: true
    },
    'rank': {
        type: String,
        require: true
    },
    'length': {
        type: Number,
        require: true
    },
    'rating': {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'ratings'
    }
});

exports.default = _mongoose2.default.model('movies', MovieSchema);