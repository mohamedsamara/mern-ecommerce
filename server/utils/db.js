
const chalk = require('chalk');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
  if (!database.url) {
    throw new Error('MONGO_URI is not configured');
  }

  try {
    await mongoose.connect(database.url);

    console.log(
      `${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`
    );
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = setupDB;
