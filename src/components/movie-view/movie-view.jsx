// renders the detailed information for each movie when clicked
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, handleUpdate }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  const [favorite, setFavorite] = useState(user.FavoriteMovies.includes(movie.id));

  useEffect(() => {
    setFavorite(user.FavoriteMovies.includes(movie.id));
  }, [movieId])

  // Add a movie to users favorite movies array
  const addFavorite = (() => {
    fetch(`http://34.203.234.174/users/${user.Username}/movies/${movieId}`, { 
    // fetch(`${apiUrl}/users/${user.Username}/movies/${movieId}`, {

      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Could not add this movie to your Favorites");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("This movie has been added to your Favorites");
          setFavorite(true);
          handleUpdate(user);
        }
      })
      .catch((e) => {
        alert(e)
      });
  })
  // Remove a movie from the users FavoriteMovies array
  const removeFavorite = (() => {
    fetch(`http://34.203.234.174/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Could not remove this movie from your Favorites");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("This movie has been deleted from your Favorites");
          setFavorite(false);
          handleUpdate(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  })

  return (
    <Container>
      <Row>
        <Col style={{}}></Col>
        < Col >
          <Card className="text-center" border="dark" style={{ width: '400px' }}>
            <Card.Img variant="top" src={movie.image} width="400" height="600" />

            <Card.Body>
              <Card.Title as="h4">{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Subtitle as="h5">Director:</Card.Subtitle>
              <Card.Text>{movie.director.name}</Card.Text>
              <Card.Subtitle as="h5">Genre: </Card.Subtitle>
              <Card.Text>{movie.genre.name}</Card.Text>
              <div className="text-center">
              <Link to={`/`}>
                <Button variant="dark" >Return to Main</Button>
              </Link>
              </div>
              <div>
              <Button className="text-left" variant="outline-dark" onClick={removeFavorite}>Remove from Favorites</Button>
              <Button className="text-right" variant="outline-dark" onClick={addFavorite}>Add to Favorites</Button>
              </div>
            </Card.Body >
          </Card >
        </Col>
        <Col></Col>
      </Row>
    </Container >
  );
};