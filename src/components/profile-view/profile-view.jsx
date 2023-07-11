import React from "react";
import { Row, Card, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://myflixapp-765.herokuapp.com/users/", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup Successful");
                window.location.reload();
            } else {
                alert("Signup Failed");
            }
        });
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
            />
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="3"
            />
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
        </Form.Group>
        
        <Button variant="primary" type="submit">Submit</Button>
    </Form>
    </>
    )
}