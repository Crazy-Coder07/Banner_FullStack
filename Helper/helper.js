
const returnServerRes=(res, statusCode, success, message, data = {})=> {
  try {
    return res.status(statusCode).json({
      success,
      status:statusCode,
      message,
      data,
    });
  } catch (error) {
    console.error(error); 
  }
}

module.exports = {
  returnServerRes,
};