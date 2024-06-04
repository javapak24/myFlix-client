import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movie-api-xkkk.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        onLoggedIn(response.user, response.token);
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
      <Form.Label>
        Username:
      </Form.Label>
      <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='4'
        /> 
      </Form.Group>
      <Form.Group controlId="formPassword">
      <Form.Label>
        Password:
      </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};




