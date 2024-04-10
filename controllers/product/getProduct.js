const { default: mongoose } = require("mongoose");
const { Product } = require("../../models");

const { catchAsync } = require("../../utils");

const getProducts = catchAsync(async (req, res, next) => {
  // const { _id } = req.user;
  
  // const tasks = await Task.find({ owner: _id }).select(
  //   "-owner -updatedAt -createdAt"
  // );

  // // const tasks = await Product.find({
  // //   $and: [
  // //     { owner: _id },
  // //     {
  // //       $expr:
  // //         {
  // //         $and: [
  // //             { $eq: [{ $year: "$date" }, year] },
  // //             { $eq: [{ $month: "$date" }, month] }
  // //          ]
  // //       }
  // //     }
  // //   ]
  // // }).select(
  // //   "-owner -updatedAt -createdAt"
  // // );
  
  const {p = 1, perPage = 10, lowPrice = 0, highPrice, ...parameters}  = req.query;
  const ids = req.body;

  console.log(ids)
  const masuv = [];

const createFilter = (params) => {
for (const key in params) { 
  console.log(key, params[key]);
  masuv.push({[key]: { $in: params[key].split(",") }});
}
return masuv
}

  const result = await Product.aggregate([
    { $match: { 
      ...(parameters.length > 0 ? { $and: createFilter(parameters) } : {})
     },},
    { $project: { namespaceId: 1, capacity: 1, color: 1, priceDiscount: 1} },
    { $group: {
      _id: "$namespaceId",
      firstDoc: { $first: "$$ROOT" }
    }},
    { $sort: { _id: 1 } },
    { $skip: p * perPage},
    { $limit: Number(perPage)},
  ]);

  // /**/

  const products = result.map(result => result.firstDoc);


  console.log('--------------------------------')
  console.log(products)
  console.log('--------------------------------')


  res.status(200).json({
    product: products,
  });
});

module.exports = getProducts;
