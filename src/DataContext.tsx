import React, { createContext } from "react";
import { useQuery, gql } from "@apollo/client";

const ALL_POST_QUERY = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const DataContext = createContext<any>(undefined);

export const DataContextProvider: React.FC = ({ children }) => {
  const { loading, error, data } = useQuery(ALL_POST_QUERY);

  return (
    <DataContext.Provider
      value={{
        loading,
        error,
        data,
        ALL_POST_QUERY
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext<any>(DataContext)!;
