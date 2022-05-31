const {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLScalarType} = require("graphql");
var _ = require('lodash');

const storesData = [
    {id:"1", name:"Store1", country:"Spain",description:"A new store", region:"Madrid", address:"Avenida de los Reyes Catolicos s/n", phoneNumber:"+347254706"},
    {id:"2", name:"Store2", country:"Germany",description:"A new store", region:"Hesse", address:"Some german address", phoneNumber:"+987254706"},
    {id:"3", name:"Store3", country:"Spain",description:"A new store", region:"Barcelona", address:"Calle Consejo de Ciento", phoneNumber:"+348782123"},
    {id:"4", name:"Store4", country:"Finland",description:"A new store", region:"Pirkanmaa", address:"Aleksanterinkatu", phoneNumber:"+358896764453"}
];
const articlesData =[
    {id:"1", name:"hammer", description:"not a hummer"},
    {id:"2", name:"spoon", description:"to eat some soup"},
    {id:"3", name:"nail", description:"not a screw"}
];

const StoreType = new GraphQLObjectType({
    name:"Store",
    description:"Store information",
    fields:()=>({
        id:{type:GraphQLID},
        name: {type:GraphQLString},
        description:{type:GraphQLString},
        country:{type:GraphQLString},
        region:{type:GraphQLString},
        address: {type:GraphQLString},
        phoneNumber: {type:GraphQLString},
    })
    
});

const ArticleType = new GraphQLObjectType({
    name: "Article",
    description: "Article information",
    fields:()=>({
        id:{type:GraphQLID},
        name: {type:GraphQLString},
        description:{type:GraphQLString},
    })
});

const MainQuery = new GraphQLObjectType({
    name: "MainQuery",
    description:"Ask for data",
    fields:{
        store: {
            type: StoreType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args) {
                return _.find(storesData,{id:args.id})
            }
        },
        article:{
            type: ArticleType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args) {
                return _.find(articlesData,{id:args.id})
            }
        },
        stores:{
            type:new GraphQLList(StoreType),
            resolve(parent,args) {
                return storesData;
            }
        },
        articles:{
            type: new GraphQLList(ArticleType),
            resolve(parent,args) {
                return articlesData;
            }
        }
    }
});

module.exports= new GraphQLSchema({
    query: MainQuery,
});
