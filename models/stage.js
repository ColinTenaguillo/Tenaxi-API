module.exports = (sequelize, DataTypes) => {
  const Stage = sequelize.define('stage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
    },
  },
    {
      freezeTableName: true,
    }
  );

  Stage.associate = (models) => {
    Stage.belongsTo(models.user);
  };

  return Stage;
}