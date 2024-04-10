const express = require("express");

const router = express.Router();

const { product: ctrl } = require("../../controllers");

const { protect } = require("../../middlewares/user/protect");
const { checkCreateData } = require("../../middlewares/product/checkCreateData");
const { checkUpdateData } = require("../../middlewares/product/checkUpdateData");

// router.use(protect);
router.post("/byId", ctrl.getProductById);

router.get("/", ctrl.getProduct);

router.get("/:id", ctrl.getProductDetails);

router.post("/", checkCreateData, ctrl.addProduct);

router.patch("/:id",checkUpdateData , ctrl.updateProduct);

router.delete("/:id", ctrl.removeProduct);

module.exports = router;
