const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('../auth/auth-router');
const tabsRouter = require('../tabs/tabs-router');
const authenticate = require('../auth/authenticate-middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/tabs', authenticate, tabsRouter);

server.get('/', (req,res) => {
  res.json({Message: "Server is up and running"})
})

module.exports = server;