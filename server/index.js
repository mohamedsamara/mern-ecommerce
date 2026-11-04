
require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const setupDB = require('./utils/db');

// Register ALL models before importing routes and Socket.io
require('./models');

const routes = require('./routes');
const socket = require('./socket');

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);

app.use(cors());

require('./config/passport')(app);
app.use(routes);

const startServer = async () => {
  try {
    // Wait for MongoDB before starting Express
    await setupDB();

    const server = app.listen(port, () => {
      console.log(
        `${chalk.green('✓')} ${chalk.blue(
          `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
        )}`
      );
    });

    socket(server);
  } catch (error) {
    console.error('Application startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
