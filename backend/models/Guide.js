module.exports = (sequelize, DataTypes) => {
  const Guide = sequelize.define(
    'Guide',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0.0,
      },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft',
      },
      viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      author_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users', // This references the 'User' table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'guides',
      timestamps: true,
      underscored: true,
    }
  );

  Guide.associate = (models) => {
    Guide.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' });
    Guide.belongsToMany(models.Category, {
      through: models.GuideCategory,
      foreignKey: 'guide_id',
      as: 'categories',
    });
    Guide.hasMany(models.Comment, { foreignKey: 'guide_id' });
    Guide.hasMany(models.Rating, { foreignKey: 'guide_id' });
  };

  return Guide;
};