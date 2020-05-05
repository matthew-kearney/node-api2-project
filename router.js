const express = require('express');

const Posts = require('./data/db');

const router = express.Router();


//Find
router.get('/', (req, res) => {
    Posts.find(req.body)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: 'The posts information could not be retrieved.' });
      });
  });


//Find By ID
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
      .then(post => {
        if (!post) {
          res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' });
        } else {
          return res.status(200).json(post);
        }
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: 'The post information could not be retrieved.' });
      });
  });

//Find comments
  router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
 
    Posts.findPostComments(id)
      .then(post => {
        if (post.length === 0) {
          res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' });
        } else {
          return res.status(200).json(post);
        }
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: 'The comments information could not be retrieved.' });
      });
  });
 
//Insert new class
  router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    } else {
      Posts.insert(req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error: 'There was an error while saving the post to the database'
          });
        });
    }
  });
 
  
 
  
module.exports = router;