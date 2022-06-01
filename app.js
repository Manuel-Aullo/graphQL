const express = require ("express");
const {graphqlHTTP} = require("express-graphql"); 
const mongoose = require("mongoose");

const schema = require("./server/schema/schema");
const storeSchema = require("./server/schema/storeSchema");
const app = express();
const port = process.env.PORT || 4000

app.use("/graphql", graphqlHTTP({ graphiql:true, schema}));
app.use("/store-graphql", graphqlHTTP({ graphiql:true, schema:storeSchema}));

mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.bwhwusz.mongodb.net/${process.env.mongoDataBase}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{ app.listen({port}, ()=> {
    console.log("listen..."); console.log(process.env.mongoUserName); console.log(process.env.mongoDataBase);
})}).catch((e)=>console.log("error", e));
