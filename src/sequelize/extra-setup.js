function applyExtraSetup(sequelize) {
  const { user, reservation, service, store, time_range } = sequelize.models;

  // professionals have a store
  user.hasOne(store);
  store.belongsTo(user);

  user.hasMany(reservation);
  reservation.belongsTo(user);

  service.hasMany(reservation);
  reservation.belongsTo(service);

  store.hasMany(service);
  service.belongsTo(store);

  reservation.hasOne(time_range);
  time_range.belongsTo(reservation);

  store.hasMany(time_range);
  time_range.belongsTo(store);
}

module.exports = { applyExtraSetup };
