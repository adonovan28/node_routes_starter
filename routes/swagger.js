const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.server);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;