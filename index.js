const express = require('express');

const postsRouter = require('./router.js');

const server = express ();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get('/', (req, res) => {
  res.send(`Im Working`);
});

server.listen(8001, () => {
  console.log('!== Server Running ==!');
});