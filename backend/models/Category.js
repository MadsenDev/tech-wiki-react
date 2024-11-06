// models/Category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      parent_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
      underscored: true,
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.Category, { foreignKey: 'parent_id', as: 'parent' });
    Category.hasMany(models.Category, { foreignKey: 'parent_id', as: 'subcategories' });
    Category.belongsToMany(models.Guide, {
      through: models.GuideCategory,
      foreignKey: 'category_id',
      otherKey: 'guide_id',
      as: 'guides',
    });
  };

  return Category;
};