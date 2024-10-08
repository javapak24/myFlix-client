import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { data } from "../../data";

const NavBar = () => {
  if (!localStorage.getItem("user")) {
    return (
      <nav>
        <ul style={{ display: "flex", justifyContent: "space-between" , listStyle: "none", padding: "8px"}}>
          <li>
          <Button>
            <Link style={{textDecoration:"none", color: "white"}} to="/login">Login</Link>
            </Button>
          </li>
          <li>
          <Button>
            <Link style={{textDecoration:"none", color: "white"}} to="/signup">Signup</Link>
            </Button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "space-between" , listStyle: "none", padding: "8px"}}>
        <li>
          <Button>
          <Link to="/" style={{textDecoration:"none", color: "white"}}>Movies</Link>
          </Button>
        </li>
        <li>
          <Button>
          <Link to="/profile" style={{textDecoration:"none", color: "white"}}>Profile</Link>
          </Button>
        </li>
        <li>
          <Button>
          <Link style={{textDecoration:"none", color: "white"}} to="#" onClick={()=>{
            localStorage.clear();
            location.reload();
            location.href = "/"

          }}>Logout</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}; 

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
              <NavBar></NavBar>
              {!user ? (
                <LoginView onLoggedIn={(user, token) => {
                  // console.log(user);
                  // localStorage.setItem("user", user);
                  setUser(user);
                  //setToken(token);
                }} />
                  ):(
                    <Navigate to="/"/>
                  )}
            </>
        }>
        </Route>
        <Route path="/signup" element={
              <>
              <NavBar></NavBar>
              <SignupView />
            </>
        }>
        </Route>
        <Route path="/" element={
              <>
              <NavBar></NavBar>
              {!user ? (
                  <Navigate to="/login" replace />
                  ):(<div style={
                    {display: "grid",
                      gridTemplateColumns: "auto auto auto",
                      backgroundColor: "#2196F3",
                      padding: "10px",
                      gridGap: "10px"
                    
                    }
                  }>
                  {
                    movies.map((movie) => (
        // <Col className = 'md5'>
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        // </Col>
      ))}
      </div>
      )}
            </>
        }>
        </Route>
        <Route path="/movies/:movieId" element={
              <>
              <NavBar></NavBar>
              {!user ? (
                  <Navigate to="/login" replace />
                  ):(
                    <MovieView movies = {movies} onBackClick={() => setSelectedMovie(null)} />
                  )}
            </>
        }>
        </Route>
        <Route path="/profile" element={
              <>
              <NavBar></NavBar>
              <ProfileView movies = {movies}/>
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
