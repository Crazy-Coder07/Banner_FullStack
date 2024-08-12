const connection = require("../database/db");
const {returnServerRes} = require("../Helper/helper");

async function bannerExistorNot(req, res, next) {
  try {
    const banner_id = req.headers.id;

    const checkBannerQuery = `
      SELECT * 
      FROM banner 
      WHERE id = ?;
    `;
    const value = [banner_id];

    await connection.query(checkBannerQuery, value, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return returnServerRes(res, 500, false, "Internal server error");
      }
      if (results.length === 0) {
        return returnServerRes(res, 404, false, "Banner not found");
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

async function updateBanner(req, res, next) {
  try {
    const banner_id = req.headers.id; 
    const { description, timer, link } = req.body; 

    const updateBannerQuery = `
      UPDATE banner
      SET description = ?, timer = ?, link = ?
      WHERE id = ?;
    `;
    const values = [description, timer, link, banner_id];

    await connection.query(updateBannerQuery, values, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return returnServerRes(res, 500, false, "Internal server error");
      }
      if (results.affectedRows === 0) {
        return returnServerRes(res, 404, false, "Failed to update banner. Banner not found.");
      }
      const successMsg = `Banner updated successfully for banner_id: ${banner_id}`;
      return returnServerRes(res, 200, true, successMsg);
    });
  } catch (error) {
    console.log(error);
    return returnServerRes(res, 500, false, "Internal server error");
  }
}

module.exports = { bannerExistorNot,updateBanner};
