// models/Comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      'Comment',
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        guide_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'guides',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      },
      {
        tableName: 'comments',
        timestamps: true,
        underscored: true,
      }
    );
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, { foreignKey: 'user_id' });
      Comment.belongsTo(models.Guide, { foreignKey: 'guide_id' });
    };
  
    return Comment;
  };