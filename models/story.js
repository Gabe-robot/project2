const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // story_title: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },

    user_story: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    story_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
  },

  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'story',
  }
);

module.exports = Story;
