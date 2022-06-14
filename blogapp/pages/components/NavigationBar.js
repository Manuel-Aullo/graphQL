import Link from "next/link";
import React from "react";
import "../../configureAmplify";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

const NavigationBar = () => {
const [signedUser, setSignedUser] = useState(false);
async function authListener() {
    Hub.listen("auth", (data) =>{
        switch(data.payload.event) {
            case "signIn":
                return setSignedUser(true);
            case "signOut":
                return setSignedUser(false);    
        } 
    })
    try {
            await Auth.currentAuthenticatedUser();
            setSignedUser(true);
    } catch (error) {console.error(error)} 
}
useEffect(() => {authListener()},[])
return(
    <nav className="flex justify-center pt-3 pb-3 space-x4 border-b bg-cyan-500 border-gray-300">
        {[["Home","/"],["Create Post", "create-post"],["Profile","/profile"]].map(([title,url], index)=>(
            <Link href={url} key={index}>
                <a>{title}</a>
            </Link>
        ))}
        {signedUser && (<Link href="/my-posts">
            <a>
                My posts
            </a>
        </Link>)}
    </nav>
);
};

export default NavigationBar;
