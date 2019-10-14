const babelOptions = {
  presets: ["babel-preset-gatsby"],
  plugins: ["babel-plugin-dynamic-import-node"]
}

module.exports = require("babel-jest").createTransformer(babelOptions)
