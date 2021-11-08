const { ApolloServer, gql } = require('apollo-server');
const lodash = require('lodash');
const uuid = require('uuid');
const axios = require('axios');
const dotenv = require('dotenv');

const typeDefs = gql`
    type Query{
        unsplashImages(pageNum: Int): [ImagePost]
        binnedImages: [ImagePost]
        userPostedImages: [ImagePost]
    }

    type ImagePost {
    id: ID! 
    url: String!
    posteName: String!
    description: String
    userPosted: Boolean!
    binned: Boolean!

}

    type Mutation{
        uploadImage(
            url: String!
            description: String
            postername: String
        ): ImagePost
        updateImage(
            id: ID!
            url: String
            postername: String
            description: String
            userPosted: Boolean
            binned: Boolean
        ): ImagePost
        deleteImage(
            id: ID!
        )
    }
`;

const resolvers = {
    Query: {
        unsplashImages: (pageNum) => {
            const unsplashImages = axios.get('')
        }
    }
};

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
  });