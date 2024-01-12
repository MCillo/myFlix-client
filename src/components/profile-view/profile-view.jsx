import React from "react";
import { Row, Card, CardGroup, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, handleUpdate, onLoggedOut, apiUrl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // Code for Favorite Movies
  let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))

  // UPDATE USER INFORMATION
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      //Password: password,
      Email: email,
      Birthday: birthday
    }

    fetch(`http://34.203.234.174/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Something went wrong");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Updated information successfully");
          handleUpdate(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  // DELETE USER'S INFORMATION
  const handleDelete = () => {
    fetch(`http://34.203.234.174/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted!");
          onLoggedOut();
          window.location.replace("/login");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  return (
    <>
      <br></br>

      <Card>
        <Card.Body>
          Here you may update your user information and view your favorite movies.
        </Card.Body>
      </Card>

      <br></br>

      {/* Update or Delete User Form */}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.Username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
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

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.Email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>


            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            {/* <Card.Footer className="text-center"> */}
            <div >
            <Button variant="dark" type="submit">Update Account</Button>
            
            
            <Button className="float-end" variant="danger" onClick={() => {
              if (confirm("You are about to permanently delete your account.")) {
                handleDelete();
              }
            }}>Delete Account</Button>
            </div>
            {/* </Card.Footer> */}
          </Form>
        </Card.Body>
      </Card>

      <br></br>

      {/* Favorite Movies */}
      <Card>
        <Col>
          <br></br>
          <h4>Your Favorite Movies</h4>
        </Col>
        <Col md={12} className="p-2">
          {favoriteMovies.length === 0 && (
            <Card className="p-4">
              <Card.Title>No favorites</Card.Title>
            </Card>
          )}

          {
            <CardGroup as={Row} className="mt-3 mb-3">
              {
                favoriteMovies.map((movie) => (
                  <Col className="mb-5" key={movie.id} md={3}>
                    <MovieCard movie={movie} />
                  </Col>)
                )
              }
            </CardGroup>
          }
        </Col>
      </Card>
    </>
  )
}