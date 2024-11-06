// models/GuideCategory.js
module.exports = (sequelize, DataTypes) => {
    const GuideCategory = sequelize.define(
      'GuideCategory',
      {
        guide_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'guides',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        category_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      },
      {
        tableName: 'guide_categories',
        timestamps: false,
        underscored: true,
      }
    );
  
    return GuideCategory;
  };