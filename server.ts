import app from "./app";

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log("running on port", port); // tslint:disable-line
});
