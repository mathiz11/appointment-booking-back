const { models } = require("../../sequelize");
const apiUtil = require("../utils/api.util");

const reservationService = {
  getAll: async () => {
    try {
      const reservations = await models.reservation.findAll();
      return apiUtil.formatResponse({ data: reservations });
    } catch (err) {
      console.error(err);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  getOne: async (id) => {
    try {
      const reservation = await models.reservation.findByPk(id);

      if (!reservation) {
        return apiUtil.formatResponse({
          status: 404,
          message: "L'ID fourni ne correspond à aucune réservation",
        });
      }

      return apiUtil.formatResponse({ data: reservation });
    } catch (err) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
  create: async (reservation) => {
    const { date, userId, serviceId } = reservation;

    try {
      const newReservation = await models.reservation.create({
        date,
        userId,
        serviceId,
      });

      return apiUtil.formatResponse({ status: 201, data: newReservation });
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
      await models.reservation.destroy({
        where: {
          id,
        },
      });

      return apiUtil.formatResponse({
        status: 204,
        message: "La réservation a bien été supprimé.",
      });
    } catch (err) {
      console.error(error);
      return apiUtil.formatResponse({ status: 500, message: error });
    }
  },
};

module.exports = reservationService;
