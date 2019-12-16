const graphql = require('graphql');

const userType = require('./Types/UserType');
const AuthService = require('../Services/localAuth');

const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = graphql;



const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //-------------------- User Authentication -----------------------
        Signup: {
            type: userType,
            args: {
                displayName: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args, request){
                
                let { displayName, phone, email, password} = args;
                displayName = displayName.toLowerCase();
                email = email.toLowerCase();
                return AuthService.signup({ displayName, phone, email, password, req:request });
            }
        },
        Login: {
            type: userType,
            args: {
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args, request){

                let { email, phone, password } = args;
                if(email) email = email.toLowerCase();
                
                return AuthService.login({ email, phone, password, req:request });
            }
        }
    }
})

module.exports = Mutations;