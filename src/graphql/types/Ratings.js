import * as graphql from 'graphql';

export const RatingType = new graphql.GraphQLObjectType({
    name:"Ratings",
    description:"Ratings in MongoDB",
    fields: () => ({
        _id:{
            type: graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        name: {
            type: graphql.GraphQLString
        },
        description: {
            type: graphql.GraphQLString
        }
    })
});

export const RatingInputType = new graphql.GraphQLInputObjectType({
    name: "RatingInput",
    description: "Insert Rating",
    fields: () => ({
        name: {
            type: graphql.GraphQLString
        },
        description: {
            type: graphql.GraphQLString
        }
    })
});