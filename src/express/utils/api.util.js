const apiUtil = {
  formatResponse: (response) => {
    const obj = { status: response.status || 200 };

    if (response.message) {
      obj.message = response.message;
    }
    if (response.data) {
      obj.data = response.data;
    }
    // if (response.error) {
    //   obj.error = response.error;
    // }

    return obj;
  },
  sendResponse: (res, response) => {
    const status = response.status;
    delete response.status;
    res.status(status).json(response);
  },
};

module.exports = apiUtil;
