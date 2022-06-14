/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $id: ID
    $title: String
    $content: String
    $username: String
    $coverimage: String
  ) {
    onCreatePost(
      id: $id
      title: $title
      content: $content
      username: $username
      coverimage: $coverimage
    ) {
      id
      title
      content
      username
      coverimage
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $id: ID
    $title: String
    $content: String
    $username: String
    $coverimage: String
  ) {
    onUpdatePost(
      id: $id
      title: $title
      content: $content
      username: $username
      coverimage: $coverimage
    ) {
      id
      title
      content
      username
      coverimage
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $id: ID
    $title: String
    $content: String
    $username: String
    $coverimage: String
  ) {
    onDeletePost(
      id: $id
      title: $title
      content: $content
      username: $username
      coverimage: $coverimage
    ) {
      id
      title
      content
      username
      coverimage
    }
  }
`;
