const Records = require('./models/records');

exports.filterRecords = (startDate, endDate, min, max) => {
  return Records.aggregate([  // promise returning
    {
      $addFields: {
        totalCount: { $sum: "$counts" }
      }
    },
    {
      $match: {  // filter according to startDate and endDate values
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        totalCount: {
          $gte: min,
          $lte: max
        }
      }
    },
    {
      $project: {   // return this fields.
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1
      }
    }
  ]);
};