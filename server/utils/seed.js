const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const setupDB = require('./db'); 
const { ROLES } = require('../constants');
const User = require('../models/user');
const Brand = require('../models/brand');
const Product = require('../models/product');

const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

const seedDB = async () => {
  try {
    console.log(`${chalk.blue('✓')} ${chalk.blue('Seed database started')}`);

    if (!email || !password) throw new Error('Missing arguments');

    // Check if admin user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Seeding admin user...')}`);

      // Seed admin user
      const user = new User({
        email,
        password,
        firstName: 'admin',
        lastName: 'admin',
        role: ROLES.Admin
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;

      await user.save();
      console.log(`${chalk.green('✓')} ${chalk.green('Admin user seeded.')}`);
    } else {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Admin user already exists, skipping seeding for admin user.')}`);
    }

    // Seed brands
    for (let i = 0; i < 10; i++) {
      const brand = new Brand({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        isActive: true
      });

      await brand.save();
    }
    console.log(`${chalk.green('✓')} ${chalk.green('Brands seeded.')}`);

    // Seed products
    const brands = await Brand.find().select('_id');
    for (let i = 0; i < 50; i++) {
      const product = new Product({
        sku: faker.string.alphanumeric(10),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        quantity: faker.number.int({ min: 1, max: 100 }),
        price: faker.commerce.price(),
        taxable: faker.datatype.boolean(),
        isActive: true,
        brand: brands[faker.number.int(brands.length - 1)]._id
      });

      await product.save();
    }
    console.log(`${chalk.green('✓')} ${chalk.green('Products seeded.')}`);

  } catch (error) {
    console.log(`${chalk.red('x')} ${chalk.red('Error while seeding database')}`);
    console.log(error);
    return null;
  }
};

(async () => {
  try {
    await setupDB();
    await seedDB();
  } catch (error) {
    console.error(`Error initializing database: ${error.message}`);
  }
})();
