const graphql = require('graphql');
const { Kind } = require('graphql/language');
const { GraphQLEnumType, GraphQLInt, GraphQLString, GraphQLScalarType, GraphQLList, GraphQLFloat, GraphQLNonNull, GraphQLInputObjectType } = graphql;

module.exports.DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'An ISO-8601 encoded UTC date string.',
    serialize: (value) => {
        return new Date(value)
    },
    parseValue: (value) => {
        return new Date(value)
    },
    parseLiteral: (ast) => {
        if (ast.kind === Kind.INT) {
          return new Date(ast.value)
        }
        throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
    }
});

module.exports.FloatType = new GraphQLScalarType({
    name: 'FloatType',
    description: 'Data type for Decimal values.',
    serialize: (value) => {
        return parseFloat(value.toString())
    },
    parseValue: (value) => {
        return value
    },
    parseLiteral: (ast) => {
        if (ast.kind === Kind.FLOAT) {
            return ast.value
        }
        throw new Error('Invalid value, expecting Float.');
    }
});

module.exports.inputLocationType = new GraphQLInputObjectType({
    name: 'InputLocation',
    fields: () => ({
        address: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        latitude: { type: new GraphQLNonNull(GraphQLFloat) },
        longitude: { type: new GraphQLNonNull(GraphQLFloat) }
    })
})