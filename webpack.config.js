const path = require("path");

module.exports = {
  entry: "./src/dom.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
