'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RankMovieType = exports.MovieInputType = exports.MovieType = undefined;

var _graphql = require('graphql');

var graphql = _interopRequireWildcard(_graphql);

var _Ratings = require('./Ratings');

var _rating = require('../../Schemas/rating');

var _rating2 = _interopRequireDefault(_rating);

var _Genres = require('./Genres');

var _genres = require('../../Schemas/genres.');

var _genres2 = _interopRequireDefault(_genres);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MovieType = exports.MovieType = new graphql.GraphQLObjectType({
    name: 'Movies',
    description: 'Types of Movies',
    fields: function fields() {
        return {
            _id: {
                type: graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            image: {
                type: graphql.GraphQLString
            },
            name: {
                type: graphql.GraphQLString
            },
            synopsis: {
                type: graphql.GraphQLString
            },
            director: {
                type: graphql.GraphQLString
            },
            year: {
                type: graphql.GraphQLInt
            },
            rank: {
                type: graphql.GraphQLList(graphql.GraphQLFloat)
            },
            duration: {
                type: graphql.GraphQLString
            },
            rating: {
                type: _Ratings.RatingType,
                resolve: function resolve(movie) {
                    var rating = movie.rating;

                    return _rating2.default.findById(rating).exec();
                }
            },
            genre: {
                type: _Genres.GenreType,
                resolve: function resolve(movie) {
                    var genre = movie.genre;

                    return _genres2.default.findById(genre).exec();
                }
            },
            language: {
                type: graphql.GraphQLString
            },
            premium: {
                type: graphql.GraphQLBoolean
            },
            url: {
                type: graphql.GraphQLString
            }

        };
    }
});

var MovieInputType = exports.MovieInputType = new graphql.GraphQLInputObjectType({
    name: 'AddMovies',
    description: 'Types of Movies',
    fields: function fields() {
        return {
            image: {
                type: graphql.GraphQLString
            },
            name: {
                type: graphql.GraphQLString
            },
            synopsis: {
                type: graphql.GraphQLString
            },
            director: {
                type: graphql.GraphQLString
            },
            year: {
                type: graphql.GraphQLInt
            },
            duration: {
                type: graphql.GraphQLString
            },
            rating: {
                type: graphql.GraphQLString
            },
            genre: {
                type: graphql.GraphQLString
            },
            language: {
                type: graphql.GraphQLString
            },
            premium: {
                type: graphql.GraphQLBoolean
            },
            url: {
                type: graphql.GraphQLString
            }
        };
    }
});

var RankMovieType = exports.RankMovieType = new graphql.GraphQLInputObjectType({
    name: "addRank",
    description: "Add rank to movie",
    fields: function fields() {
        return {
            rank: {
                type: graphql.GraphQLFloat
            }
        };
    }
});