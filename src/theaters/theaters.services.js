const knex = require("../db/connection");

//returns a list of all theaters
function list() {
  return knex("theaters").select("*");
}

//returns a list of all movies for a particular theater
function moviesList(theater) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "t.theater_id": theater.theater_id });
}

module.exports = { list, moviesList };