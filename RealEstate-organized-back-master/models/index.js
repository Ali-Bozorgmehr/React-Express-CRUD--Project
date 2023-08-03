const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.rents = require("./allModels/rent.model")(mongoose);
db.sells = require("./allModels/sell.model")(mongoose);
db.requests = require("./allModels/request.model")(mongoose);
db.users = require("./allModels/user.model")(mongoose);

module.exports = db;
