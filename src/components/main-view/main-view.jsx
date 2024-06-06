import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetch("https://movie-api-xkkk.onrender.com/movies")
          .then((response) => response.json())
          .then(movies=>{
          setMovies(movies)})
          .catch(e=>console.log(e))
          
      }, []);

      // if (!user) {
      //   return (
          // <>
          //   <LoginView onLoggedIn={(user, token) => {
          //     setUser(user);
          //     setToken(token);
          //   }} />
          //   or
          //   <SignupView />
          // </>
      //   );
      // }

  // if (selectedMovie) {
  //   return (
      // <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //   );
  // }

  // if (movies.length === 0) {
  //   return <div>The list is empty!</div>;
  // }
//console.log(movies);
  return (
    <BrowserRouter>
    <Row>
      <Routes>
        <Route path="/login" element={
              <>
              <LoginView onLoggedIn={(user, token) => {
                console.log(user);
                localStorage.setItem("user", user);
                setUser(user);
                //setToken(token);
              }} />
            </>
        }>
        </Route>
        <Route path="/signup" element={
              <>
              <SignupView />
            </>
        }>
        </Route>
        <Route path="/" element={
              <>
              {!user ? (
                  <Navigate to="/login" replace />
                  ):(<>
                  {
                    movies.map((movie) => (
        <Col className = 'md5'>
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}
      </>
      )}
            </>
        }>
        </Route>
        <Route path="/" element={
              <>
              {!user ? (
                  <Navigate to="/movies/:movieId" replace />
                  ):(
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                  )}
            </>
        }>
        </Route>
      {/* {movies.map((movie) => (
        <Col className = 'md5'>
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))} */}
     {/* <button onClick={() => { setUser(null); localStorage.clear(); }}>Logout</button> */}
     </Routes>
    </Row>
    </BrowserRouter>
  );
};
