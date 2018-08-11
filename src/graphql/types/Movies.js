import * as graphql from 'graphql';

import {RatingType} from './Ratings'
import Rating from '../../Schemas/rating'

import {GenreType} from './Genres'
import Genre from '../../Schemas/genres.'

export const MovieType = new graphql.GraphQLObjectType({
    name: "Movies",
    description: "Types of Movies",
    fields: () => ({
        _id:{
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
            type: graphql.GraphQLInt
        },
        duration: {
            type: graphql.GraphQLString
        },
        rating: {
            type: RatingType,
            resolve(movie){
                const {rating} = movie
                return Rating.findById(rating).exec()
            }
        },
        genre: {
            type: GenreType,
            resolve(movie){
                const {genre} = movie
                return Genre.findById(genre).exec()
            }
        }
    })
});

export const MovieInputType = new graphql.GraphQLInputObjectType({
    name:"AddMovies",
    description: "Types of Movies",
    fields: () => ({
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
    }
    })
});
