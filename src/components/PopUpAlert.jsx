import { useState } from "react";
import Alert from "react-bootstrap/Alert";

export const PopUpAlert = (props) => {
  console.log("---------", props.value);
  const [show, setShow] = useState(true);

  const onCloseHandler = () => {
    setShow(false);
    props.onClose({});
  };

  const infoMap = {
    danger: "Oops, Error!",
    success: "Success!",
  };

  if (show) {
    return (
      <Alert
        variant={props.value.status}
        onClose={() => onCloseHandler()}
        dismissible
      >
        <Alert.Heading>{infoMap[props.value.status]}</Alert.Heading>
        <p>{props.value.info}</p>
      </Alert>
    );
  }
};
