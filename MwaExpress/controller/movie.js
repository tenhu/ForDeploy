
const Movie = require('../model/movieModel');

module.exports.showMovie = (req, res, next) => {
  Movie.find({}, (err, movie) => {
    //console.log(movie);
    res.status(201).json(movie);
  });
};
module.exports.showOneMovie = (req, res, next) => {
  Movie.find({"_id":req.params.id}).then(function (movie) {
    console.log(req.params.id)
    res.json(movie);
  });
};

module.exports.addMovie = (req, res, next) => {

  const title = req.body.title;
  const released = req.body.released;
  const imageUrl = req.body.imageUrl;
  const director = req.body.director;
  const type = req.body.type;
  const descripton = req.body.descripton;

  const movie = new Movie({
    title: title,
    released: released,
    imageUrl: imageUrl,
    director: director,
    review: {
      reviews: []
    },
    cinema: {
      cinemas: []
    },
    type: type,
    descripton: descripton 
  });
  movie
    .save()
    .then(result => {
      console.log('Created Movie');
      res.status(201).json({ success: 1 });
    })
    .catch(err => {
      console.log(err);
    });
  };




module.exports.editMovie = (req, rest) => {

}
