const { models } = require("../../sequelize");
const apiUtil = require("../utils/api.util");

const serviceService = {
  getAll: async () => {
    try {
      const services = await models.service.findAll();
      return apiUtil.formatResponse({ data: services });
    } catch (err) {
      console.error(err);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  getOne: async (id) => {
    try {
      const service = await models.service.findByPk(id);

      if (!service) {
        return apiUtil.formatResponse({
          status: 404,
          message: "L'ID fourni ne correspond à aucun service",
        });
      }

      return apiUtil.formatResponse({ data: service });
    } catch (err) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  create: async (service) => {
    const { name, price, time, storeId } = service;

    try {
      const newService = await models.service.create({
        name,
        price,
        time,
        storeId,
      });

      return apiUtil.formatResponse({ status: 201, data: newService });
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
      await models.service.destroy({
        where: {
          id,
        },
      });

      return apiUtil.formatResponse({
        status: 204,
        message: "Le service a bien été supprimé.",
      });
    } catch (err) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
};

module.exports = serviceService;
