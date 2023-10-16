// Users.tsx
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import Address from "../Address";

interface IUser {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface IAddress {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  async function deleteUser(id: number) {
    try {
      await api.delete(`/users/${id}`);
      alert("Usuário deletado com sucesso!");
      loadUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  function newUser() {
    navigate('/users/newUser')
  }

  // function editUser(id: number) {
  //   navigate(`/users/editUser/${id}`)
  // }

  const loadAddresses = async (userId: number) => {
    try {
      const response = await api.get(`/users/${userId}/addresses`);
      setAddresses(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
    }
  };

  const closeModal = () => {
    setAddresses([]);
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="user-header">
        <br />
        <h1>User</h1>
        <Button variant ="dark" onClick={newUser}>New User</Button>
      </div>

      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.cpf}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Button variant="info" onClick={() => loadAddresses(user.id)}>
                  Show Addresses
                </Button>
              </td>
              <td>
              {/* <Button size="sm" onClick={() => editUser(user.id)}>Editar</Button> { } */}
              <Button size="sm" variant="danger" onClick={() => deleteUser(user.id)}>Remover</Button> { }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Address addresses={addresses} showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default Users;
