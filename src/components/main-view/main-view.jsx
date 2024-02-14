// ISSUES TO FIX
// 1. upon successful login need to refresh to show movies list

import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { GalleryView } from "../gallery-view/gallery-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MyFlixUrl } from '../../utils/url'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState("");

  const [gallery, setGallery] = useState([]);
  console.log(gallery);
  // For updating the user
  const handleUpdate = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  // Get all movies from server and set them to local state
  async function fetchMovies() {
    try {
      const fetchedData = await fetch(MyFlixUrl + `/movies`, {
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

  //Used to return gallery of images

  useEffect(() => {
    fetch(`${MyFlixUrl}/images`, {
      // fetch('http://localhost:8080/images', {

      method: "GET",
      headers: {
        "Access-Control-Allow-Origin":
          // "http:localhost:8080",
          // "MyFlix-Load-Balancer-2030192027.us-east-1.elb.amazonaws.com/",
          "http://MyFlix-App-Load-Balancer-754907701.us-east-1.elb.amazonaws.com"
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const newGallery = data.Contents.map((image) => {
          return image.Key;
        });
        setGallery(newGallery);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Used to retrun list of movies
  useEffect(() => {
    if (!token) return;

    fetchMovies();
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>

          {/* Signup Route */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                    />
                  </Col>
                )}
              </>
            }
          />

          {/* MovieView Route */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} handleUpdate={handleUpdate} />
                  </Col>
                )}
              </>
            }
          />

          {/* MovieCard Route */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Row className="mt-1 mb-1">
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        value={filteredMovies}
                        onChange={(e) => setFilteredMovies(e.target.value)}
                      />
                    </Row>
                    {movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      movies.filter((movie) => movie.title.toLowerCase().includes(filteredMovies.toLowerCase())
                      )
                        .map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                    )}
                  </>
                )}
              </>
            }
          />

          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView user={user} token={token} movies={movies} handleUpdate={handleUpdate} onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                    />
                  </Col>
                )}
              </>
            }
          />

          {/* Gallery Route */}
          <Route
            path="/gallery"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <GalleryView
                      gallery={gallery}
                      upLoadImage={(imageName) => {
                        setGallery((prevGallery) => [
                          ...prevGallery,
                          imageName,
                        ]);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

        </Routes>
      </Row>
    </BrowserRouter>
  );
};