/**
 * Router file.
 */

var express = require("express");
var router = express.Router();

//"/homepage" route
router.get("/homepage", function(req, res){
  res.render("homepage/homepage");
});

module.exports = router;
