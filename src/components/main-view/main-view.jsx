import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  // From reading - error before login - loads "list is empty" with no login view showing
  //const [user, setUser] = useState(storedUser ? storedUser : null);
  //const [token, setToken] = useState(storedToken ? storedToken : null);
  // Works to show login
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // Trial - does not work
  // const [user, setUser] = useState(storedUser);
  // const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    console.log(storedToken);
    if (!token) return;
    // console.log(storedToken);
    fetch("https://myflixapp-765.herokuapp.com/movies", {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id, // is this not the key for JSX ??
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

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        < MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};