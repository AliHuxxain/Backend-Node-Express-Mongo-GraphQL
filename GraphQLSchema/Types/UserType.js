const graphql = require('graphql');

const { DateTime } = require('./CustomInputTypes');
const listingType = require('./ListingType');
const driverType = require('./DriverType');
const verificationType = require('./VerificationType');
const payoutInfoType = require('./PayoutInfoType');

const ListingOperations = require('../../Services/listingOperations');
const VerificationOperations = require('../../Services/verificationOperations');
const DriverOperations = require('../../Services/driverOperations');
const PayoutInfoOperations = require('../../Services/payoutInfoOperations');

const { GraphQLString, GraphQLList, GraphQLBoolean, GraphQLID, GraphQLObjectType } = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        googleID: { type: GraphQLID },
        facebookID: { type: GraphQLID },
        createdOn: { type: DateTime },
        displayName: { type: GraphQLString },
        phone: { type: GraphQLString },
        phoneVerified: { type: GraphQLBoolean },
        email: { type: GraphQLString },
        emailVerified: { type: GraphQLBoolean },
        profilePic: { type: GraphQLString },
        listings: {
            type: new GraphQLList(listingType),
            resolve(parentValue, args) {
                return ListingOperations.findAllByUser(parentValue.id);
            }
        },
        drivers: {
            type: new GraphQLList(driverType),
            resolve(parentValue, args) {
                return DriverOperations.findAllByUser(parentValue.id);
            }
        },
        verification: {
            type: verificationType,
            resolve(parentValue, args) {
                
                return VerificationOperations.findOneByUser(parentValue.id);

            }
        },
        PayoutInformation: {
            type: payoutInfoType,
            resolve(parentValue, args) {
                return PayoutInfoOperations.findOneByUser(parentValue.id);
            }
        }
    })
})

module.exports = userType;