//styled-components 바로 적용될수있게..

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [["babel-plugin-styled-components", { displayName: true }]],
};
