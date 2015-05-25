// Node initializer.

var express = require("express");
var routes = require("./routes");
var path = require("path");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var app = express();

// Configure app
app.set("port", process.env.PORT || 8080);

app.set("views", path.join(__dirname, "server_templates"));
app.engine("hbs", exphbs({
  extname: ".hbs",
  partialsDir: "server_templates/"
}));
app.set("view engine", "hbs");

// Configure middleware
app.use("/static", express.static(path.join(__dirname, "frontend/assets")));
app.use("/static", express.static(path.join(__dirname, "frontend/bower_components")));
app.use("/static", express.static(path.join(__dirname, "frontend/build")));
app.use("/static", express.static(path.join(__dirname, "frontend/config")));
app.use("/static", express.static(path.join(__dirname, "frontend/mock_data")));

app.use(bodyParser.urlencoded({
  extended: true
}));

// Configure routes
app.use(routes);

app.listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
