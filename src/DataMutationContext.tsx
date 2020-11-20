import React, { createContext } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const ALL_POST_QUERY = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const ADD_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $description: String!
    $id: ID!
    $userId: ID!
  ) {
    createPost(
      title: $title
      description: $description
      views: 0
      user_id: $userId
      id: $id
    ) {
      id
      title
    }
  }
`;

const DataMutationContext = createContext<any>(undefined);

export const DataMutationContextProvider: React.FC = ({ children }) => {
  const [addPost, { data, loading, error }] = useMutation(ADD_POST_MUTATION, {
    update: (cache, { data: { createPost } }) => {
      // get the posts from the cache...
      const currentData: any = cache.readQuery({ query: ALL_POST_QUERY });
      // add the new post to the cache & write results back to cache
      cache.writeQuery({
        query: ALL_POST_QUERY,
        data: {
          allPosts: [...currentData.allPosts, createPost],
        },
      });
    },
  });

  return (
    <DataMutationContext.Provider
      value={{
        loading,
        error,
        data,
        addPost
      }}
    >
      {children}
    </DataMutationContext.Provider>
  );
};

export const useDataMutation = () =>
  React.useContext<any>(DataMutationContext)!;
