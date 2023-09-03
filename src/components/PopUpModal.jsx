import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const PopUpModal = (props) => {
  const titleMap = {
    delete: "Delete Confirmation!",
  };
  const infoMap = {
    delete: `Are you sure you want to delete ${props.product.productName}?`,
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{titleMap[props.type]}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{infoMap[props.type]}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.setShow(false)}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => props.onConfirm(props.product.productId)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
