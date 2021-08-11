const BABEL_ENV = process.env.BABEL_ENV;
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === "cjs";
const isESM = BABEL_ENV !== undefined && BABEL_ENV === "esm";

module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/env",
      {
        loose: false,
        modules: isCommonJS ? "commonjs" : false,
        targets: {
          esmodules: isESM ? true : undefined,
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ];

  const plugins = [
    "@babel/plugin-proposal-class-properties",
    [
      "babel-plugin-transform-remove-imports",
      {
        test: "\\.(less|css)$",
      },
    ],
  ];

  return {
    presets,
    plugins,
    ignore: ["*.stories.tsx"],
  };
};
