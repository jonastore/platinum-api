export default (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('basic', 'premium', 'onetime-premium'),
      required: true,
    },
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });


  Questionnaire.associate = (models) => {
    Questionnaire.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'userId',
    });

    Questionnaire.hasMany(models.Poll, {
      as: 'Polls',
      foreignKey: 'questionnaireId',
    });

    Questionnaire.hasMany(models.Question, {
      as: 'Questions',
      foreignKey: 'questionnaireId',
    });
  };

  return Questionnaire;
};
