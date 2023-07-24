import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (

    <Card className="text-center h-100" border="dark" style={{ width: "300px" }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Director: {movie.director.name}</Card.Text>
        <Card.Text>Genre: {movie.genre.name}</Card.Text>
        {/* <Card.Footer> */}
        <div style={{ marginBottom: '5px' }}>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="dark" className="mt-auto">
              More Information
            </Button >
          </Link>
        </div>
        {/* </Card.Footer> */}
      </Card.Body>
    </Card>
  );
};
