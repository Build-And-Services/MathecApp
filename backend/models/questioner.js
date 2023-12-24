"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Questioner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.CategoryQuestioner, {
<<<<<<< HEAD
        foreignKey: 'id_category_questioner',
        as: 'category',
=======
        foreignKey: "id_category_questioner",
        as: "category",
      });
      this.hasMany(models.LinkertScore, {
        foreignKey: "id_questioner",
        as: "linkertScore",
>>>>>>> 470671078cae94574d6293260eefbfc6eec2891b
      });
    }
  }
  Questioner.init(
    {
      questioner: DataTypes.STRING,
      id_category_questioner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Questioner",
      tableName: "Questioners",
      underscored: true,
    },
  );
  return Questioner;
};
