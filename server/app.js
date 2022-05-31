const express = require ("express");
const {graphqlHTTP} = require("express-graphql"); 

const schema = require("./schema/schema");
const storeSchema = require("./schema/storeSchema");
const app = express();

app.use("/graphql", graphqlHTTP({ graphiql:true, schema}));
app.use("/store-graphql", graphqlHTTP({ graphiql:true, schema:storeSchema}));

app.listen(4000, ()=>{
     console.log("listen...")
 })