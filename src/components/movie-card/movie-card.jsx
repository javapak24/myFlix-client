import PropType from "prop-types";
import { Button, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log(movie);
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to = {`/movies/${movie._id}`}>
          Open
        </Link>
        </Card.Body>
      </Card>
    );
  };
  MovieCard.propTypes = {
    movie: PropType.shape({
      Title: PropType.string.isRequired,
      ImagePath: PropType.string.isRequired, 
    }).isRequired
  };