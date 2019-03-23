import * as dotenv from "dotenv";
import * as path from "path";

let filename = ".env.test";

if (process.env.NODE_ENV === "production") {
  filename = ".env.production";
}

dotenv.config({
  path: path.resolve(path.join(__dirname, filename )),
});
