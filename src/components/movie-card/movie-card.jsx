import PropType from "prop-types";
import { Button, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log(movie);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const addFav = () => {
    fetch(`https://movie-api-xkkk.onrender.com/users/${user.Username}/${movie._id}`, {
      "method": "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
            }
    })
          .then((response) => response.json())
          .then(movies=>{
            alert("Movie added")})
          .catch(e=>console.log(e))
  }
  const removeFav = () => {
    fetch(`https://movie-api-xkkk.onrender.com/users/${user.Username}/${movie._id}`, {
      "method": "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
            }
    })
          .then((response) => response.json())
          .then(movies=>{
            alert("Movie deleted")})
          .catch(e=>console.log(e))
  }
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to = {`/movies/${movie._id}`}>
          Open
        </Link>
        <Button onClick={addFav}>
          Add to Favorites
        </Button>
        <Button onClick={removeFav}>
          Remove from Favorites
        </Button>
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