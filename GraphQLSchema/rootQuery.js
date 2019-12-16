const graphql = require('graphql');

const UserOperations = require('../Services/userOperations');
const userType = require('./Types/UserType');

const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //-------------------- Users -----------------------
        Users :{
            type: new GraphQLList(userType),
            resolve(parent, args, request){
                return UserOperations.findAll();
            }
        },
        User :{
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args, request){

                const { id } = args;
                return UserOperations.findOne(id);
            }
        }
    }
})

module.exports = RootQuery;