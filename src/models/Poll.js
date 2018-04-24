export default (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    link: {
      type: DataTypes.STRING,
      unique: true,
    },
    qrCode: {
      type: DataTypes.STRING,
      unique: true,
    },
    maxNumOfVotes: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'closed'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    closedAt: DataTypes.DATE,
    duration: DataTypes.INTEGER,
  });


  Poll.associate = (models) => {
    Poll.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'userId',
    });

    Poll.belongsTo(models.Questionnaire, {
      as: 'Questionnaire',
      foreignKey: 'id',
    });

    Poll.hasMany(models.Answer, {
      as: 'Result',
      foreignKey: 'id',
    });
  };

  return Poll;
};
