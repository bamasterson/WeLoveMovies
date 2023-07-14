const knex = require("../db/connection");

//returns full list of movies
function list() {
  return knex("movies").select("*");
}

//returns a movie by ID
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

//returns movies that are in theaters
function moviesInTheaters() {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .distinct("mt.movie_id");
}

//returns list of theaters that are playing a particular movie
function whereToWatch(movieId) {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId })
    .distinct("mt.theater_id");
}

module.exports = {
  list,
  read,
  moviesInTheaters,
  whereToWatch
};