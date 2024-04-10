const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { date, number } = require("joi");


const productSchema = Schema({
  // id: {
  //    type: String, required: true, unique: true
  //    },
  namespaceId: { 
    type: String, required: true 
  },
  name: {
     type: String, required: true 
    },
  capacityAvailable: {
     type: [String], required: true 
    },
  capacity: {
     type: String, required: true 
    },
  priceRegular: {
     type: Number, required: true 
    },
  priceDiscount: {
     type: Number, required: true 
    },
  colorsAvailable: {
     type: [String], required: true 
    },
  color: {
     type: String, required: true },
  images: {
     type: [String], required: true 
    },
  description: {
    type: [
      {
        title: { type: String, required: true },
        text: { type: [String], required: true },
      },
    ],
    required: true,
  },
  screen: {
     type: String, 
    },
  resolution: {
     type: String, 
    },
  processor: {
     type: String, 
    },
  ram: {
     type: String, 
    },
  camera: {
     type: String, 
    },
  zoom: {
     type: String,
    },
  cell: {
     type: [String],
    },
},
// { versionKey: false, timestamps: true }
);


// const taskShema = Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       // required: [true, "Set name for task"],
//     },
//     date: {
//       type: Date,
//       // type: String,
//       // default: Date.now,
//     },
//     startTime: {
//       type: String,
//     },
//     endTime: {
//       type: String,
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//     priority: {
//       type: String,
//       trim: true,
//       enum: ["low", "medium", "high"],
//       default: "low",
//       required: true,
//     },
//     category: {
//       type: String,
//       trim: true,
//       enum: ["toDo", "inProgress", "done"],
//       default: "toDo",
//       required: true,
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

const Product = model("product", productSchema);
const oneDay = 86400000;

const productJoiSchema = (data) => Joi.object({
  title: Joi.string().max(250).required(),
  date: Joi.date().min(new Date() - oneDay).required(),
  startTime: Joi.string()
    .regex(/^([0-9]{2}):([0-9]{2})$/)
    .required(),
  endTime: Joi.string()
    .regex(/^([0-9]{2}):([0-9]{2})$/)
    .required(),
    // .min(Joi.ref("startTime")),
  priority: Joi.string().valid(...["low", "medium", "high"]).required(),
  // priority: Joi.string().empty("").required(),
  category: Joi.string().valid(...["toDo", "inProgress", "done"]).required(),
  // category: Joi.string().empty("").required(),
}).custom((value, helpers) => {
  const start = new Date(`2000-01-01T${value.startTime}:00`);
  const end = new Date(`2000-01-01T${value.endTime}:00`);

  if (end <= start) {
    return helpers.error('any.invalid');
  }
  return value;
}).messages({
  'any.invalid': 'endTime should be greater than startTime'
}).validate(data);

const productJoiUpdateSchema = (data) => Joi.object({
  title: Joi.string().max(250),
  startTime: Joi.string()
    .regex(/^([0-9]{2}):([0-9]{2})$/)
    ,
  endTime: Joi.string()
    .regex(/^([0-9]{2}):([0-9]{2})$/)
    ,
    // .min(Joi.ref("startTime")),
  priority: Joi.string().valid(...["low", "medium", "high"]),
  // priority: Joi.string().empty(""),
  category: Joi.string().valid(...["toDo", "inProgress", "done"]),
  // category: Joi.string().empty(""),
}).custom((value, helpers) => {
  const start = new Date(`2000-01-01T${value.startTime}:00`);
  const end = new Date(`2000-01-01T${value.endTime}:00`);

  if (end <= start) {
    return helpers.error('any.invalid');
  }
  return value;
}).messages({
  'any.invalid': 'endTime should be greater than startTime'
}).validate(data);

module.exports = {
  Product,
  productJoiSchema,
  productJoiUpdateSchema,
};
