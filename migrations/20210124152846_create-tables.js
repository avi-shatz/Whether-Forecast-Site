const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Places", deps: []
 * createTable() => "Users", deps: []
 *
 */

const info = {
  revision: 1,
  name: "create-tables",
  created: "2021-01-24T15:28:46.318Z",
  comment: "",
};

const migrationCommands = (transaction) => {
  return [
    {
      fn: "createTable",
      params: [
        "Places",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          name: { type: Sequelize.STRING, field: "name", allowNull: false },
          lon: { type: Sequelize.FLOAT, field: "lon", allowNull: false },
          lat: { type: Sequelize.FLOAT, field: "lat", allowNull: false },
          userID: {
            type: Sequelize.INTEGER,
            field: "userID",
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
        },
        { transaction },
      ],
    },
    {
      fn: "createTable",
      params: [
        "Users",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          firstName: {
            type: Sequelize.STRING,
            field: "firstName",
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            field: "lastName",
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            field: "email",
            unique: true,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            field: "password",
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
        },
        { transaction },
      ],
    },
  ];
};

const rollbackCommands = (transaction) => {
  return [
    {
      fn: "dropTable",
      params: ["Places", { transaction }],
    },
    {
      fn: "dropTable",
      params: ["Users", { transaction }],
    },
  ];
};

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (this.useTransaction) {
    return queryInterface.sequelize.transaction(run);
  }
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) => {
    return execute(queryInterface, sequelize, migrationCommands);
  },
  down: (queryInterface, sequelize) => {
    return execute(queryInterface, sequelize, rollbackCommands);
  },
  info,
};
