import { IonItem, IonLabel, IonText } from "@ionic/react";
import React from "react";
 const ListItem: React.FC<any> = ({ data }) => {
  console.log("ListItem");
  return (
    <IonItem key={data.id}>
      <IonLabel>
        <h1>{data.title}</h1>
        <div className="ion-text-wrap">
          <IonText>{data.description}</IonText>
        </div>
        <div
          className="ion-text-wrap"
          style={{ paddingTop: 6, fontStyle: "italic" }}
        >
          <IonText>{data.id}</IonText>
        </div>
      </IonLabel>
    </IonItem>
  );
};


export default React.memo(ListItem)