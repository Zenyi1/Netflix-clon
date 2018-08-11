'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _genres = require('../../../Schemas/genres.');

var _genres2 = _interopRequireDefault(_genres);

var _Genres = require('../../types/Genres');

var _graphql = require('graphql');

var graphql = _interopRequireWildcard(_graphql);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    type: _Genres.GenreType,
    args: {
        data: {
            name: 'data',
            type: new graphql.GraphQLNonNull(_Genres.GenreInputType)
        }
    },
    resolve: function resolve(root, params) {
        var genre = new _genres2.default(params.data);
        var newGenre = genre.save();
        if (!newGenre) throw new Error("Error at creating genre");
        return newGenre;
    }
};