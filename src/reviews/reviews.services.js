const knex = require("../db/connection");

//deletes a review via ID
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

//returns a particular review via its ID
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

//returns a list of reviews for a particular movie
function readMovieReviews(movieId) {
  return knex("reviews")
  .where({ movie_id: movieId })
  .then((reviews) => Promise.all(reviews.map(setCritic)));
}

// returns a particular critic by their ID
function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

//updates a review
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((review) => {
      review[0];
    });
}

//sets critics for reviews
async function setCritic(review) {
  review.critic = await getCritic(review.critic_id);
  return review;
}

module.exports = {
  readMovieReviews,
  delete: destroy,
  read,
  update,
  getCritic
};