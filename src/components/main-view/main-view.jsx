import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  console.log("line 10: ", storedUser, storedToken);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Get all movies from server and set them to local state
  async function fetchMovies() {
    try {
      const fetchedData = await fetch(`https://myflixapp-765.herokuapp.com/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await fetchedData.json();
      const movies = jsonData.map((movie) => {
          return {
            id: movie._id, 
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: {
              name: movie.Genre.Name,
              description: movie.Genre.Description,
            },
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio
            }
          };
      });

      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) return;

    fetchMovies();
  }, [token]);

return (
  <Row className="justify-content-md-center">
    {!user ? (
    <Col md={5}>
      <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
      <SignupView />
    </Col>        
  ) : selectedMovie ? (
    <Col md={"8"} style={{ border: "2px solid black" }} >
      <MovieView style={{ border: "2px solid green" }} movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    </Col>
  ) : movies.length === 0 ? (
    <div>The list is empty!</div>
  ) : (
    <>
      {movies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
        < MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}    
    </>
  )}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

  </Row>

  );
};