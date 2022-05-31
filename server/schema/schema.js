const {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLScalarType} = require("graphql");
var _ = require('lodash');

let usersData = [
     {id: '1', name: 'Bond', age: 36, profession: 'Programmer'},
     {id: '13', name: 'Anna', age: 26, profession: 'Baker'},
     {id: '211', name: 'Bella', age: 16, profession: 'Mechanic'},
     {id: '19', name: 'Gina', age: 26, profession: 'Painter'},
     {id: '150', name: 'Georgina', age: 36, profession: 'Teacher'}
];

let hobbiesData = [
    {id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '150'},
    {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donouts', userId: '211'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211'},
    {id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '13'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150'},
];

let postsData = [
    {id: '1', comment: 'Building a Mind', userId: '1'},
    {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
    {id: '3', comment: 'How to Change the World', userId: '19'},
    {id: '4', comment: 'How to Change the World', userId: '211'},
    {id: '5', comment: 'How to Change the World', userId: '1'}
];

const UserType= new GraphQLObjectType({
    name:"User",
    description:"User description",
    fields:()=>({
        id: {type: GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        profession:{type:GraphQLString},
        posts:{type: new GraphQLList(PostType),
        resolve(parent,args) {
            return _.filter(postsData, {userId: parent.id});
        }
        },
        hobbies: {type: new GraphQLList(HobbyType),
            resolve(parent,args) {
                return _.filter(hobbiesData,{userId: parent.id})
            }}
    })
});

const HobbyType = new GraphQLObjectType({
    name:"Hobby",
    description: "Description",
    fields:()=>({
        id: {type: GraphQLID},
        title:{type:GraphQLString},
        description:{type:GraphQLString},
        user: {
            type: UserType,
            resolve(parent,args) {
                return _.find(usersData,{id:parent.userId})
            }
        },
    })
});

const PostType = new GraphQLObjectType({
    name:"Post",
    description: "Description",
    fields:()=>({
        id: {type: GraphQLID},
        comment:{type:GraphQLString},
        user: {
            type: UserType,
            resolve(parent,args) {
                return _.find(usersData,{id:parent.userId})
            }
        },
    })
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: { type:GraphQLString},
                age: { type: GraphQLInt},
                profession: { type: GraphQLString } 
            },
            resolve(parent,args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                comment: { type: GraphQLString},
                userId: { type: GraphQLID}
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }
                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                title: { type: GraphQLString},
                description: { type: GraphQLString},
                userId: { type: GraphQLID}
            },
            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return hobby;
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    description:"User description",
    fields:{
        user : {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                // resolve with data
                // get and return data from a datasource
                return _.find(usersData,{id:args.id})
            }
        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return _.find(hobbiesData,{id:args.id})
            }
        },
        post : {
            type: PostType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args) {
                return _.find(postsData,{id:args.id})
            }
        }, 
        users: {
            type: new GraphQLList(UserType), 
            resolve(parent,args){
                return usersData;
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return postsData;
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent,args) {
                return hobbiesData;
            }
        }
    }
});

module.exports= new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});