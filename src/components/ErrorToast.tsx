import { IonToast } from "@ionic/react";
import React from "react";
import { ApolloError } from "@apollo/client";
const ErrorToast: React.FC<{ error: ApolloError | undefined }> = ({
  error,
}) => {
  console.log("ErrorToast");
  return (
    <>
      <IonToast
        isOpen={error?.message ? true : false}
        duration={3000}
        color="danger"
        message={error?.message}
      />
    </>
  );
};

export default React.memo(ErrorToast);
