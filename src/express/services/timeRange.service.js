const { Op } = require("sequelize");
const { models } = require("../../sequelize");
const apiUtil = require("../utils/api.util");
const dayjs = require("dayjs");

const timeRangeService = {
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
};

module.exports = timeRangeService;
