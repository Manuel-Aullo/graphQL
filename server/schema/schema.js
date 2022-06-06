const {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLScalarType, GraphQLNonNull, graphql} = require("graphql");
var _ = require('lodash');
const User = require("../model/user");
const Hobby = require("../model/hobby");
const Post = require("../model/post");
const { find } = require("lodash");
const { mongoose } = require("mongoose");

// let usersData = [
//      {id: '1', name: 'Bond', age: 36, profession: 'Programmer'},
//      {id: '13', name: 'Anna', age: 26, profession: 'Baker'},
//      {id: '211', name: 'Bella', age: 16, profession: 'Mechanic'},
//      {id: '19', name: 'Gina', age: 26, profession: 'Painter'},
//      {id: '150', name: 'Georgina', age: 36, profession: 'Teacher'}
// ];

// let hobbiesData = [
//     {id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '150'},
//     {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donouts', userId: '211'},
//     {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211'},
//     {id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '13'},
//     {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150'},
// ];

// let postsData = [
//     {id: '1', comment: 'Building a Mind', userId: '1'},
//     {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
//     {id: '3', comment: 'How to Change the World', userId: '19'},
//     {id: '4', comment: 'How to Change the World', userId: '211'},
//     {id: '5', comment: 'How to Change the World', userId: '1'}
// ];

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
            // return _.filter(postsData, {userId: parent.id});
            return Post.find({userId: parent.id})
            }
        },
        hobbies: {type: new GraphQLList(HobbyType),
            resolve(parent,args) {
                //return _.filter(hobbiesData,{userId: parent.id})
                return Hobby.find({userId: parent.id})
            }
        }
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
                //return _.find(usersData,{id:parent.userId})
                return User.find({userId: parent.id})
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
                //return _.find(usersData,{id:parent.userId})
                return User.find({userId: parent.id})
            }
        },
    })
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        CreateUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull (GraphQLString) },
                age: { type:  new GraphQLNonNull (GraphQLInt) },
                profession: { type:  GraphQLString} 
            },
            resolve(parent,args) {
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });
                return user.save();
            }
        },
        UpdateUser: {
            type: UserType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLString)},
                name: { type: new GraphQLNonNull (GraphQLString) },
                age: { type:  new GraphQLNonNull (GraphQLInt) },
                profession: { type:  GraphQLString} 
            },
            resolve(parent,args) {
        
                return UpdateUser = User.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        age: args.age,
                        profession: args.profession
                    },
                },
                {new: true}
                )
            }
        },
        RemoveUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args) {
                let removedUser = User.findByIdAndRemove(args.id).exec()
                if(!removedUser) {
                    throw new "Error"()
                }
                return removedUser;
            }
        },
        CreatePost: {
            type: PostType,
            args: {
                comment: { type: new GraphQLNonNull (GraphQLString)},
                userId: { type: new GraphQLNonNull (GraphQLID)}
            },
            resolve(parent, args) {
                let post = Post({
                    comment: args.comment,
                    userId: args.userId
                });
                return post.save();
            }
        },
        RemovePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args) {
                let removedPost = Post.findByIdAndRemove(args.id).exec()
                if(!removedPost) {
                    throw new "Error"()
                }
                return removedPost;
            }
        },
        UpdatePost: {
            type: PostType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLString)},
               comment: { type: new GraphQLNonNull (GraphQLString) },
            },
            resolve(parent,args) {
        
                return UpdatePost = Post.findByIdAndUpdate(args.id, {
                    $set: {
                        comment: args.comment,
                    },
                },
                {new: true}
                )
            }
        },
        CreateHobby: {
            type: HobbyType,
            args: {
                title: { type: new GraphQLNonNull (GraphQLString)},
                description: { type: new GraphQLNonNull (GraphQLString)},
                userId: { type: new GraphQLNonNull (GraphQLID)}
            },
            resolve(parent, args) {
                let hobby = Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                });
                return hobby.save();
            }
        },
        UpdateHobby: {
            type: HobbyType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLString)},
               title: { type: new GraphQLNonNull(GraphQLString) },
               description: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent,args) {
        
                return UpdateHobby = Hobby.findByIdAndUpdate(args.id, {
                    $set: {
                        title: args.title,
                        description: args.description
                    },
                },
                {new: true}
                )
            }
        },
        RemoveHobby: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args) {
                let removedHobby = Hobby.findByIdAndRemove(args.id).exec()
                if(!removedHobby) {
                    throw new "Error"()
                }
                return removedHobby;
            }
        },
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
                //return _.find(usersData,{id:args.id})
                return User.findById({id: args.id})
            }
        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                //return _.find(hobbiesData,{id:args.id})
                return Hobby.findById({id: args.id})
            }
        },
        post : {
            type: PostType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args) {
                //return _.find(postsData,{id:args.id})
                return Post.findById({id: args.id})
            }
        }, 
        users: {
            type: new GraphQLList(UserType), 
            resolve(parent,args){
                return User;
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return Post;
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent,args) {
                return Hobby;
            }
        }
    }
});

module.exports= new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});