const router = require("express").Router();
const compilerController = require("../controllers/compiler");

router.post("/", compilerController.runCode);

router.get("/list", compilerController.getSupportedLanguages);

module.exports = router;
