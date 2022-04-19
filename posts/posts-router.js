const express = require("express");

//import db module
const DB = require("../data/db");

const postsRouter = express.Router();

postsRouter.use(express.json());

// CRUD STARTS HERE...

//GET POSTS
postsRouter.get("/", (req, res) => {
  DB.find()
    .then(post => {
      res.status(202).json({ post });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET specified comment
postsRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  DB.findPostComments(id)
    .then(posts => {
      if (posts) {
        res.status(200).json({ posts });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//GET comments
postsRouter.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  DB.findPostComments(id)
    .then(post => {
      if (post.length > 0) {
        res.status(202).json({ post });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//POST post
postsRouter.post("/", (req, res) => {
  const newPost = req.body;
  if (newPost.title && newPost.contents) {
    DB.insert(newPost)
      .then(post => {
        res.status(201).json({ post });
      })
      .catch(err => {
        res.status(500).json(
          {
            error: "There was an error while saving the post to the database"
          },
          err
        );
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

// POST comment
postsRouter.post("/:id/comments", (req, res) => {
  const id = parseInt(req.params.id);

  DB.findById(id).then(post => {
    if (post.length > 0) {
      DB.insertComment(req.body)
        .then(comment => {
          if (req.body.text) {
            res.status(201).json({ comment });
          } else {
            res
              .status(400)
              .json({ errorMessage: "Please provide text for the comment." });
          }
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the comment to the database"
          });
        });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
});

// DELETE
// postsRouter.delete("/:id ", (req, res) => {
//   const id = parseInt(req.params.id);

//   const removedPost = DB.findById(id)
//     .then(post => {
//       if (removedPost > 0) {
//         DB.remove(removedPost.id)
//           .then(removed => {
//             res.status(200).json({ removedPost });
//           })
//           .catch(err => {
//             res.status(500).json({ error: "The post could not be removed" });
//           });
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The post could not be removed" });
//     });
// });

//post-router export
module.exports = postsRouter;
