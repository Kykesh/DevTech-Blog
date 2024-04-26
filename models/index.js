// models/index.js
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Post = require('./Post')(sequelize, Sequelize.DataTypes);
const Comment = require('./Comment')(sequelize, Sequelize.DataTypes);

User.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(User);

User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User);

Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post);

module.exports = {
  sequelize,
  User,
  Post,
  Comment
};
