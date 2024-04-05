const Story = require('./Story');
const User = require('./User');

User.hasMany(Story, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Story.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Story };
