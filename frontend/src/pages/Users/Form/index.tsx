// Users.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { Table, Button, Form } from "react-bootstrap";
import api from "../../../services/api";

interface IUser {
  name: string;
  cpf: string;
  email: string
  password: string;
  phone: string;
}

const UsersForm: React.FC = () => {

  const [model, setModel] = useState<IUser>({
    name: '',
    cpf: '',
    email: '',
    password: '',
    phone: ''
  })


  function updatedModel(e: ChangeEvent<HTMLInputElement>) {

    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  function onSubmit (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const response = api.post('/users', model)

    console.log(response)
  }

  return (
    <div className="container">
      <div className="user-header">
        <br />
        <h1>User</h1>
      </div>

      <br />

      <div className="container">
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicNamel">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter name" name="name" 
        onChange= {(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" name="email" 
        onChange= {(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password"
        onChange= {(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCPF">
        <Form.Label>CPF</Form.Label>
        <Form.Control type="cpf" placeholder="CPF" name="cpf"
        onChange= {(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" placeholder="Phone" name="phone"
        onChange= {(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>

    </div>
  );
};

export default UsersForm;
