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

import MyModal from "../components/MyModal";
import ListItem from "../components/ListItem";
import ErrorToast from "../components/ErrorToast";
import { useData } from "../DataContext";
import { useDataMutation } from "../DataMutationContext";

const Home: React.FC = () => {
  const { ALL_POST_QUERY, error, data, loading } = useData();
  const m = useDataMutation();

  // tracks modal state
  const [showAddItem, setShowAddItem] = useState(false);

  /**
   * 
   * @param resp 
   */
  const processResp = async (resp: any) => {
    if (resp.cancelled) return;
    try {
      await m.addPost({
        variables: {
          title: resp.data?.title,
          description: resp.data?.description,
          id: uuidv4(),
          userId: 123,
        },
      });
    } catch (e) {}
  };

  if (m.loading || loading) return <IonLoading isOpen={m.loading || loading} />;

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
        <ErrorToast error={m.error || error} />
        {data &&
          data.allPosts.map((e: any) => <ListItem data={e} key={e.id} />)}
      </IonContent>
    </IonPage>
  );
};

export default Home;
