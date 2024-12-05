const routes = require("express").Router();
const myController = require("../controllers");



routes.get("/", myController.awesomeFunction);

routes.get("/", )

routes.get("/ttech", myController.getAllStudents );
// student routes
routes.use("/students", require("./students"));

module.exports = routes;
