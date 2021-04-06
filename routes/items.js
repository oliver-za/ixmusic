const express = require("express");

const itemController = require("../controllers/items");

const router = express.Router();

router.get("/tracks", itemController.getTracks);
 
module.exports = router;
   