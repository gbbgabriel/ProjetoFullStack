// Address.tsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface IAddress {
  id: number;
  street: string;
  city: string;
  state: string;
}

interface AddressProps {
  addresses: IAddress[];
  showModal: boolean;
  closeModal: () => void;
}

const Address: React.FC<AddressProps> = ({ addresses, showModal, closeModal }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Addresses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {addresses.map((address) => (
            <li key={address.id}>
              Rua: {address.street}, Cidade: {address.city}, Estado: {address.state}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Address;
