const Movie = require('../model/movieModel');
const itemperpage = 20;
const log = require('log4node');

module.exports.list=(req,res,next)=>{
    let page = req.query.p;
    if(page==null || page <= 0){
        page=1;
    }

    let q = req.query.q != null ? req.query.q.trim() : '';
    let propmise = q > ''?
    Movie.paginate(
      { $text: { $search : q } },{ score : { $meta: 'textScore' }},
      { page: page, limit: itemperpage , sort: { score: { $meta : 'textScore'}}})
    :Movie.paginate({}, {page: page, limit: itemperpage, sort:'title'});
    propmise.then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        log.error(err);
        next("Query failed");
    });
};

module.exports.get=(req,res,next)=>{
  Movie.findById(req.params.id)
  .then((m)=>{
    if(m!=null){
      res.status(200).json({succeeded:true, data:m});
    }else{
      res.status(400).json({error:"Movie not found"});
    }
  })
  .catch((err)=>{
      log.error(err);
      next("Query failed");
  });
};

module.exports.add=(req,res,next)=>{
    let movie = new Movie({
        title: req.body.title,
        released: req.body.released,
        imageUrl: req.body.imageUrl,
        director: req.body.director,
        type: req.body.director,
        descripton:req.body.descripton
      });
      movie
        .save()
        .then(result => {
          res.status(201).json({ 
            succeeded : true, 
            data:result
          });
        })
        .catch(err => {
          log.error(err);
          next("Save error");
        });
};


module.exports.update = (req,res,next)=>{
    Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        released: req.body.released,
        imageUrl: req.body.imageUrl,
        director: req.body.director,
        type: req.body.director,
        descripton:req.body.descripton
      },(err,doc)=>{
          if(err){
            log.error(err);
            next("Save error");
          }else{
            if(doc!=null){
                res.status(200).json({
                  succeeded:true,
                  data:doc
                });
            }else{
                next({code:404, message:"Movie not foud"});
            }
          }
      });
};

module.exports.delete = (req,res,next)=>{
    Movie.findByIdAndDelete(req.params.id,
        (err,doc)=>{
            if(err){
                log.error(err);
                next("Save error");
              }else{
                if(doc!=null){
                    res.status(200).json({succeeded:true});
                }else{
                    next({code:404,message:"Movie not foud"});
                }
              }    
        });
};

