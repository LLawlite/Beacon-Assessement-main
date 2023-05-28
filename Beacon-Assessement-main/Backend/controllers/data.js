const data = require('../models/data');

exports.getAlldata = async (req, res) => {
  try {
    const datas = await data
      .find()
      .then((results) => {
        //  console.log("The data is ",results)
        return results;
      })
      .catch((error) => {
        console.error('Error while retrieving data:', error);
      });
    return res.status(200).json({
      success: true,
      count: datas.length,
      data: datas,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.getData = async (req, res) => {
  try {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const symbol = req.body.symbol;
    console.log({ startDate, endDate, symbol });
    const datas = await data
      .find({
        date: { $gte: startDate, $lte: endDate },
      })
      .then((results) => {
        // console.log('Data between the specified dates:', results);
        return results;
      })
      .catch((error) => {
        console.error('Error while retrieving data:', error);
      });
    // console.log(datas);
    return res.status(200).json({
      success: true,
      count: datas.length,
      data: datas,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
