const { ApolloServer, gql } = require('apollo-server');
const lodash = require('lodash');
const uuid = require('uuid');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
import { createApi } from 'unsplash-js';

const bluebird = require('bluebird');
const flat = require('flat');
const unflatten = flat.unflatten;
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const unsplash = createApi({
    accessKey: process.env.AccessKey
  });

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

let imagePosts = [];

const resolvers = {
    Query: {
        unsplashImages: (page) => {
            const photos = unsplash.photos.get(
                {pageNum: page}
            );

           const imagePosts = photos.map( (photo) => {return {
                id: photo.id,
                url: photo.urls.full,
                posterName: photo.user.name,
                description: photo.description,
                userPosted: false,
                binned: false
           } } );
           return imagePosts;
        },
        binnedImages: () => {
            
        },
        userPostedImages: () =>{

        }
    }
};

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
  });