const createHttpError = require("http-errors");
const {  productJoiSchema } = require("../../models");
const { catchAsync } = require("../../utils");

const checkCreateData = catchAsync(async (req, res, next) => {

  console.log('=------------------------------')
  console.log('first')
      
  // const { error, value } = productJoiSchema(req.body); 
  
  // console.log('=------------------------------')
  // console.log('error', error)
  // console.log('value', value)      

  //   if (error) return next(createHttpError.BadRequest(error.details[0].message));
              
  //   req.body = value;
    
  next();
});

module.exports = {
  checkCreateData,
};