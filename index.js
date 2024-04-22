import Sequelize from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
  // definde: {
  //   freezeTableName: true,
  //   timestamps: false,
  // },
});

await sequelize.authenticate();
console.log("Connection has b  een established successfully.");

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //* Model attributes are defined here
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "username",
      validate: {
        isAlpha: true,
        notEmpty: true,
        len: [3, 20],
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    //* Other model options go here
    // freezeTableName: true,
    // timeStamps: false,
  }
);

//* `sequelize.define` also returns the model
console.log(User === sequelize.models.user); // true

await sequelize.sync({ force: true });

const user = User.build({
  username: "admin",
  password: "admin",
  age: 25,
  isActive: true,
});

await user.save();
// await user.save({ fields: ["username", "password"] });

// const user = User.create({
//   username: "admin",
//   password: "admin",
//   age: 25,
//   isActive: true,
// });

console.log(user.toJSON());

//* Insert multiple records.
//! NOTE: bulkCreate does not trigger hooks and validations.

User.bulkCreate(
  [
    {
      username: "user1",
      password: "user1",
      age: 25,
      isActive: true,
    },
    {
      username: "user2",
      password: "user2",
      age: 25,
      isActive: true,
    },
    {
      username: "user3",
      password: "user3",
      age: 25,
      isActive: true,
    },
  ],
  { validate: true }
);

const users = await User.findAll();

// const users = await User.findAll({
//   attributes: ["username", "age"],
// });

// const users = await User.findAll({
//   attributes: [["username", "name"], "password", "pwd"],
// });

// const users = await User.findAll({
//   attributes: [[sequelize.fn("COUNT", sequelize.col("user_id")), "count"]],
// });

// const user = await User.findOne({
//   where: {
//     [Op.and]: [{ username: "admin" }, { age: 25 }],
//   },
// });

console.log(users);

export default sequelize;
