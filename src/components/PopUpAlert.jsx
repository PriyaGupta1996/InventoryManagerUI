import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

export const PopUpAlert = (props) => {
  const { value, onClose } = props;
  const [show, setShow] = useState(true);

  const onCloseHandler = () => {
    setShow(false);
    onClose({});
  };

  const infoMap = {
    danger: "Oops, Error!",
    success: "Success!",
  };

  return (
    show && (
      <Alert variant={value.status} onClose={onCloseHandler} dismissible>
        <Alert.Heading>{infoMap[value.status]}</Alert.Heading>
        <p>{value.info}</p>
      </Alert>
    )
  );
};
