// models/Rating.js
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define(
      'Rating',
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        rating: {
          type: DataTypes.TINYINT,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
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
        tableName: 'ratings',
        timestamps: true,
        underscored: true,
      }
    );
  
    Rating.associate = (models) => {
      Rating.belongsTo(models.User, { foreignKey: 'user_id' });
      Rating.belongsTo(models.Guide, { foreignKey: 'guide_id' });
    };
  
    return Rating;
  };