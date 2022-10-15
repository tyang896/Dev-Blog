const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//User can have many post and comments
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
})

//Post can only belong to one user and have many comments
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Post, Comment };
