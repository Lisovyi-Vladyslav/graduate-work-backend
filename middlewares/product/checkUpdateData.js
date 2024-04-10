const createHttpError = require("http-errors");
// const {  taskJoiSchema } = require("../../models");
const { catchAsync } = require("../../utils");
const { productJoiUpdateSchema } = require("../../models/productShema");

const checkUpdateData = catchAsync(async (req, res, next) => {
      
  // const { error, value } = productJoiUpdateSchema(req.body); 
  
        
  //   if (error) return next(createHttpError.BadRequest(error.details[0].message));
              
  //   req.body = value;
    
  next();
});

module.exports = {
  checkUpdateData,
};