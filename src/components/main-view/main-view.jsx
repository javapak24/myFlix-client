import { useState, useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, SetMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjMDUxMjY3NmJmZTc2Nzg2YjRjYWIiLCJVc2VybmFtZSI6InNwb25nZWJvYiIsIlBhc3N3b3JkIjoic3F1YXJlcGFudHMiLCJFbWFpbCI6InRoZXNwb25nZUBrcnVzdHlrcmFiLmNvbSIsIkJpcnRoZGF5IjoiMTk5Ni0wNy0wOFQwMDowMDowMC4wMDBaIiwiRmF2b3JpdGVNb3ZpZXMiOltdLCJfX3YiOjAsImlhdCI6MTcxNjk0NTM5MCwiZXhwIjoxNzE3NTUwMTkwLCJzdWIiOiJzcG9uZ2Vib2IifQ.Nyl43bZW1AtWjJJ2xVkIMU4xNMQw3PxUb_TU2PcTTjU";
        fetch("https://movie-api-xkkk.onrender.com/movies", {       
            headers:{
                Authorizantion:"Bearer " + token
        }})
          .then((response) => response.json())
          .then(movies=>{
          setMovies(movies)})
          .catch(e=>console.log(e))
          
      }, []);

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
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
