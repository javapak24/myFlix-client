import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("https://movie-api-xkkk.onrender.com/movies")
          .then((response) => response.json())
          .then(movies=>{
          setMovies(movies)})
          .catch(e=>console.log(e))
          
      }, []);

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
//console.log(movies);
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};
