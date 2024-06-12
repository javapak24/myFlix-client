import { useParams } from 'react-router';
import './movie-view.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const MovieView = ({ movies, onBackClick }) => {
  const {movieId} = useParams();
  const [movie] = useState(movies.find((mov) => mov._id == movieId));

  console.log(movie);
  console.log(movies);
  console.log(movieId);

  if (!movie) return <>Loading...</>
  else

    return (
      <div>
        <div>
          <img src={location.href.split("/movies")[0] + "/" + movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <Link to = "/">
          Back
        </Link>
      </div>
    );
  };