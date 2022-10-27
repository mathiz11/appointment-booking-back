const { Op } = require("sequelize");
const { models } = require("../../sequelize");
const apiUtil = require("../utils/api.util");
const dayjs = require("dayjs");

const timeRangeService = {
  getOne: async (id) => {
    try {
      const timeRange = await models.time_range.findByPk(id);

      if (!timeRange) {
        return apiUtil.formatResponse({
          status: 404,
          message: "L'ID fourni ne correspond à aucun horaire.",
        });
      }

      return apiUtil.formatResponse({ data: timeRange });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  getAll: async (params) => {
    try {
      const timeRanges = await models.time_range.findAll(
        params
          ? {
              where: params,
            }
          : undefined
      );
      return apiUtil.formatResponse({ data: timeRanges });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  getAllByDate: async (date, params) => {
    const startDate = dayjs(date).startOf("day").toDate();
    const endDate = dayjs(date).endOf("day").toDate();

    timeRangeOptions = { startDate: { [Op.between]: [startDate, endDate] } };

    if (params.storeId) {
      timeRangeOptions.storeId = params.storeId;
    }

    try {
      const timeRanges = await models.time_range.findAll({
        where: timeRangeOptions,
      });
      return apiUtil.formatResponse({ data: timeRanges });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  create: async (timeRange) => {
    const { startDate, endDate, storeId, reservationId } = timeRange;

    try {
      const newTimeRange = await models.time_range.create({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        storeId,
        reservationId,
      });

      return apiUtil.formatResponse({ status: 201, data: newTimeRange });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  remove: async (id) => {
    try {
      await models.time_range.destroy({
        where: {
          id,
        },
      });

      return apiUtil.formatResponse({
        status: 204,
        message: "L'horaire a bien été supprimé.",
      });
    } catch (error) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
};

module.exports = timeRangeService;
