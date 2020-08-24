import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonLoading,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Home.css";
import { NavButtons } from "../components/NavButtons";

import { gql, useQuery, useMutation } from "@apollo/client";
import MyModal from "../components/MyModal";
import  ListItem  from "../components/ListItem";
import  ErrorToast  from "../components/ErrorToast";

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

const Home: React.FC = () => {
  const { loading: qLoading, error: qError, data: qData } = useQuery(
    ALL_POST_QUERY
  );

  const [
    addPost,
    { data: mData, loading: mLoading, error: mError },
  ] = useMutation(ADD_POST_MUTATION, {
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

  // tracks modal state
  const [showAddItem, setShowAddItem] = useState(false);

  // track state of my user
  // const [myUser, setMyUser] = useState({ name: "Aaron" });

  const processResp = async (resp: any) => {
    if (resp.cancelled) return;
    try {
      await addPost({
        variables: {
          title: resp.data?.title,
          description: resp.data?.description,
          id: uuidv4(),
          userId: 123,
        },
      });
    } catch (e) {}
  };

  if (mLoading || qLoading) return <IonLoading isOpen={mLoading || qLoading} />

  return (
    <IonPage id="home">
      <IonHeader>
        <IonToolbar>
          <IonTitle>HOME</IonTitle>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton fill="outline" onClick={() => setShowAddItem(true)}>
              ADD
            </IonButton>
          </IonButtons>
        </IonToolbar>


        <MyModal
          isOpen={showAddItem}
          initialData={null}
          onClose={(resp: any) => {
            setShowAddItem(false);
            processResp(resp);
            console.log(resp);
          }}
        />
        <ErrorToast error={mError || qError} />
        {qData &&
          qData.allPosts.map((e: any) => <ListItem data={e} key={e.id} />)}
      </IonContent>
    </IonPage>
  );
};

export default Home;


