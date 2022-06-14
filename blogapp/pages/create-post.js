import { withAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useRef, React, useState } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { content } from "../tailwind.config";
import { createPost } from "../../src/graphql/mutations";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"),{ssr:false,})


const initialState={title:"", content:""};

function CreatePost() {
    const [post, setPost]= useState(initialState);
    const {title,content} = post;
    const router = useRouter();

    function onChange(e){
        setPost(() =>({
            ...post, [e.target.name]: e.target.value
        }))
    }
    
    async function createNewPost() {
        console.log(post)
        if (!title||!content) return;
        const id = uuid();
        post.id = id;
        await API.graphql({
            query: createPost,
            variables: {input: post},
            authMode: "AMAZON_COGNITO_USER_POOLS"// Authenticated user
        })
        router.push(`/posts/${id}`)
    }
    return (
        <>
        <h1>Create new post</h1>
        <input onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}/>
 <SimpleMDE 
        name="content"
        value={post.content}
        onChange={(value) => setPost({...post, content: value})}/>
        <button type="button" onClick={createNewPost}
        >Create post</button>
        
        </>
    )
}

export default withAuthenticator (CreatePost);