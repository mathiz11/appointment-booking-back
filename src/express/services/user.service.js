const { models } = require("../../sequelize");
const apiUtil = require("../utils/api.util");

const userService = {
  getAll: async () => {
    try {
      const users = await models.user.findAll();
      return apiUtil.formatResponse({ data: users });
    } catch (err) {
      console.error(err);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  getOne: async (id) => {
    try {
      const user = await models.user.findByPk(id);

      if (!user) {
        return apiUtil.formatResponse({
          status: 404,
          message: "L'ID fourni ne correspond à aucun utilisateur",
        });
      }

      return apiUtil.formatResponse({ data: user });
    } catch (err) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  create: async (user) => {
    const { email, name, phone, password } = user;

    try {
      const newUser = await models.user.create({
        email,
        name,
        phone,
        password,
      });

      return apiUtil.formatResponse({ status: 201, data: newUser });
    } catch (err) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  remove: async (id) => {
    let response = this.getOne(id);

    if (!response.data) {
      return response;
    }

    try {
      await models.user.destroy({
        where: {
          id,
        },
      });

      return apiUtil.formatResponse({
        status: 204,
        message: "L'utilisateur a bien été supprimé.",
      });
    } catch (err) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
};

module.exports = userService;
