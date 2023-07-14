// renders the detailed information for each movie when clicked
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, handleUpdate }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  // Test Code Start

  const [favorite, setFavorite] = useState(user.FavoriteMovies.includes(movie.id));

  useEffect(() => {
      setFavorite(user.FavoriteMovies.includes(movie.id));
  }, [movieId])

  const addFavorite = (() => {
      fetch(`https://myflixapp-765.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
      })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  alert("Could not add to Favorites");
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

  const removeFavorite = (() => {
      fetch(`https://myflixapp-765.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
      })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  alert("Could not remove from Favorites");
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

  // Test Code Stop


  return (
    <div>
      <div>
        <img src={movie.image} width="400" height="600" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <Link to={`/`}>
      <Button variant="primary" >Back</Button>
      </Link>
      {/* <Button variant="secondary">Like</Button> */}

      {/* Test Code Favorites Buttons */}
      {favorite ?
                    <Button className="float-end" variant="outline-danger" onClick={removeFavorite}>Remove from Favorites</Button>
                    : <Button className="float-end" variant="outline-success" onClick={addFavorite}>Add to Favorites</Button>}
    </div>
  );
};