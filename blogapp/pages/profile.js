import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

function Profile () {
    const [user,setUser]= useState(null);
    useEffect(()=>{
        checkUser();
    },[]);
    async function checkUser() {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
    }
    if(!user) return null;
    return (<><h1>Profile</h1><h1>{user.username}</h1><p>{user.attributes.email}</p>
    <AmplifySignOut/></>)
}

export default withAuthenticator(Profile);