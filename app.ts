import "./env";

import * as express from "express";
import * as ParseDashboard from "parse-dashboard";
import { ParseServer } from "parse-server";
import * as path from "path";

const app = express();

const STAGE = process.env.STAGE;

const cloud = (global as any).__TESTING__ ?
  path.resolve(__dirname, "cloud.ts") :
  path.resolve(__dirname, "cloud.js");

const api = new ParseServer({
  appId: process.env.APP_ID,
  cloud, // Absolute path to your Cloud Code
  databaseURI: process.env.DATABASE_URI, // Connection string for your MongoDB database
  fileKey: process.env.FILE_KEY,
  javascriptKey: process.env.JS_KEY,
  masterKey: process.env.MASTER_KEY, // Keep this key secret!
  serverURL: process.env.SERVER_URL, // Don't forget to change to https if needed
});

const dashboard = new ParseDashboard({
  allowInsecureHTTP: true,
  apps: [{
    appId: process.env.APP_ID,
    appName: `Parse serverless (${process.env.NODE_ENV})`,
    fileKey: process.env.FILE_KEY,
    javascriptKey: process.env.JS_KEY,
    masterKey: process.env.MASTER_KEY,
    production: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging",
    serverURL: process.env.SERVER_URL,
  }],
  useEncryptedPasswords: false,
  users: [{
    pass: process.env.DASHBOARD_PASS,
    user: process.env.DASHBOARD_USERNAME,
  }],
}, {
  allowInsecureHTTP: true,
  cookieSessionSecret: "parse-serverless",
});

app.use("/parse", api);

// Workaround for having dashboards on Lambda
if (STAGE) {
  app.use(`/${STAGE}/dashboard`, dashboard);
} else {
  app.use("/dashboard", dashboard);
}

export default app;
