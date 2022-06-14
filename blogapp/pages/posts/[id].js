import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import post from "../../../server/model/post";
import "../../configureAmplify";
import {listPosts, getPost} from "../../src/graphql/queries";

export default function Post({post}) {
    const router= useRouter();
    if (router.isFallback) {
        return <>Loading</>
    }

    return (
        <>
        <h1>{post.title}</h1>
        <p>{post.username}</p>
        <p>{post.content}</p>
        </>
    )

}


export async function getStaticPaths() {
    const postData = await API.graphql({
      query: listPosts
    })
    const paths = postData.data.listPosts.items.map(post => ({ params: { id: post.id }}))
    return {
      paths,
      fallback: true
    }
  }
  
  export async function getStaticProps({ params }) {
    const { id } = params;
    const postData = await API.graphql({
      query: getPost,
      variables: { id },
    });
    return {
      props: {
        post: postData.data.getPost,
      },
      revalidate: 1,
    };
  }