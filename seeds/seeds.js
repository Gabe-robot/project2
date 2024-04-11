const sequelize = require('../config/connection');
const { User, Story  } = require('../models');

const userData = require('./userData.json');
const storyData = require('./storyData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('users seeded')

  const stories = await Story.bulkCreate(storyData, {
    individualHooks: true,
    returning: true,
  });

  console.log('stories seeded')

  process.exit(0);
};

seedDatabase();
