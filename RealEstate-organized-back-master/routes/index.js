const express = require("express");
const app = express();
const rentAuthRouter = require("./allRoutes/rentAuth.routes");
const sellAuthRouter = require("./allRoutes/sellAuth.routes");
const rentRouter = require("./allRoutes/rent.routes");
const sellRouter = require("./allRoutes/sell.routes");
const requestRouter = require("./allRoutes/request.routes");
const userRouter = require("./allRoutes/user.routes");
const endpointRouter = require("./allRoutes/endpoint.routes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/auth/dashboard/rents", rentAuthRouter);
  app.use("/auth/dashboard/sells", sellAuthRouter);
  app.use("/rents", rentRouter);
  app.use("/sells", sellRouter);
  app.use("/", requestRouter);
  app.use("/user", userRouter);
  app.use("/", endpointRouter);
};
