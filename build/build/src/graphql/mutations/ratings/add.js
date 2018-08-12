'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rating = require('../../../Schemas/rating');

var _rating2 = _interopRequireDefault(_rating);

var _Ratings = require('../../types/Ratings');

var _graphql = require('graphql');

var graphql = _interopRequireWildcard(_graphql);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {

    type: _Ratings.RatingType,
    args: {
        data: {
            name: 'data',
            type: new graphql.GraphQLNonNull(_Ratings.RatingInputType)
        }
    },
    resolve: function resolve(root, params) {
        var rating = new _rating2.default(params.data);
        var newRating = rating.save();
        if (!newRating) throw new Error("Error at creating genre");
        return newRating;
    }
};