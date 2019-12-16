const graphql = require('graphql');
const Mutation = require('./mutation');
const RootQuery = require('./rootQuery');

const { GraphQLSchema } = graphql;


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});