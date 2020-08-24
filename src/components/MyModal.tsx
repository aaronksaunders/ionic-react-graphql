import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
} from "@ionic/react";
import "./my-modal.css";
const MyModal: React.FunctionComponent<{
  initialData: any;
  isOpen: boolean;
  onClose: Function;
}> = ({ initialData, isOpen, onClose }) => {
  const [formData, setFormData] = useState<any>(initialData);
  return (
    <IonModal isOpen={isOpen} id="my-modal">
      <IonHeader  >
        <IonToolbar   color="red">
          <IonTitle>MY MODAL</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput
            value={formData?.title}
            onIonChange={(e) =>
              setFormData({ ...formData, title: e.detail.value })
            }
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea
            value={formData?.description}
            rows={6}
            onIonChange={(e) =>
              setFormData({ ...formData, description: e.detail.value })
            }
          ></IonTextarea>
        </IonItem>
        <p></p>
        <IonButton
          fill="outline"
          onClick={() => {
            onClose({ cancelled: false, data: formData });
            setFormData(null);
          }}
        >
          SAVE CHANGES
        </IonButton>
        <IonButton
          id="cancelBtn"
          fill="outline"
          onClick={() => {
            onClose({ cancelled: true, data: null });
            setFormData(null);
          }}
        >
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default MyModal;
