const connection = require("../database/db");
const {returnServerRes} = require("../Helper/helper");

async function getBanner(req, res, next) {
  try {

    const getBannerQuery = `
      SELECT *
      FROM banner
    `;
    
    await connection.query(getBannerQuery, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return returnServerRes(res, 500, false, "Internal server error");
      }

      if (results.length === 0) {
        return returnServerRes(res, 404, false, "No data found for this banner");
      }

      const payload = {
        bannerData: results[0],
      };

      const successMsg = `Banner data retrieved successfully.`;

      return returnServerRes(res, 200, true, successMsg, payload);
    });
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}


module.exports = { getBanner};
