const services = require("./movies.services");

//movie existence validator, checks table for movie and returns an error if it is not found
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await services.read(movieId); 
  if (movie) {
    res.locals.movie = movie;
    return next();
  } 
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

//returns a specific movie
function read(req, res) {
  res.json({ data: res.locals.movie });
}

//is_showing query validator, used in conjunction with list()
async function movieIsShowing(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    res.locals.movies = await services.moviesInTheaters();
    // console.log(res.locals.movies);
    return next();
  } else {
    res.locals.movies = await services.list();
    return next();
  }
}

//lists all movies from movies table
function list(req, res) {
  res.json({ data: res.locals.movies });
}

module.exports = {
  list: [movieIsShowing, list],
  read: [movieExists, read],
};