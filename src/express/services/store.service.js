const { models } = require("../../sequelize");
const apiUtil = require("../utils/api.util");

const storeService = {
  getAll: async () => {
    try {
      const stores = await models.store.findAll();
      return apiUtil.formatResponse({ data: stores });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  getOne: async (id) => {
    try {
      const store = await models.store.findByPk(id);

      if (!store) {
        return apiUtil.formatResponse({
          status: 404,
          message: "L'ID fourni ne correspond à aucun établissement",
        });
      }

      return apiUtil.formatResponse({ data: store });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  getByUserId: async (userId) => {
    try {
      const store = await models.store.findOne({
        where: {
          userId,
        },
      });

      if (!store) {
        return apiUtil.formatResponse({
          status: 404,
          message: "L'utilisateur n'est lié à aucun établissement",
        });
      }

      return apiUtil.formatResponse({ data: store });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  create: async (store) => {
    const { name, address, userId } = store;

    try {
      const newStore = await models.store.create({
        name,
        address,
        userId,
      });

      return apiUtil.formatResponse({ status: 201, data: newStore });
    } catch (error) {
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
      await models.store.destroy({
        where: {
          id,
        },
      });

      return apiUtil.formatResponse({
        status: 204,
        message: "L'établissement a bien été supprimé.",
      });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
};

module.exports = storeService;
