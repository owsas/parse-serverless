import app from "./app";
import "./cloud"; // include cloud file in the compilation

const serverless = require("serverless-http"); // tslint:disable-line

module.exports.handler = serverless(app);
