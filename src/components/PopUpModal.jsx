import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const PopUpModal = (props) => {
  const { type, product, show, setShow, onConfirm } = props;

  const titleMap = {
    delete: "Delete Confirmation!",
  };

  const infoMap = {
    delete: `Are you sure you want to delete ${product.productName}?`,
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{titleMap[type]}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{infoMap[type]}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          No
        </Button>
        <Button variant="danger" onClick={() => onConfirm(product.productId)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
