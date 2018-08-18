'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var graphql = _interopRequireWildcard(_graphql);

var _movies = require('../../../Schemas/movies');

var _movies2 = _interopRequireDefault(_movies);

var _Movies = require('../../types/Movies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//Organizar los rank de estrellitas
exports.default = {
    type: _Movies.MovieType,
    args: {
        id: {
            name: "ID",
            type: graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        data: {
            name: "data",
            type: graphql.GraphQLNonNull(_Movies.RankMovieType)
        }
    }, resolve: function resolve(root, params) {
        var id = params.id,
            data = params.data;

        return _movies2.default.findByIdAndUpdate(id, { $push: { rank: data.rank } }).then(function (movie) {
            return _movies2.default.findById(movie.id).exec();
        });
    }
};