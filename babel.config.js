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

  let plugins = [
    "@babel/plugin-proposal-class-properties",
    "babel-plugin-date-fns",
  ];

  if (BABEL_ENV !== undefined) {
    plugins = [
      ...plugins,
      [
        "babel-plugin-transform-remove-imports",
        {
          test: "\\.(less|css)$",
        },
      ],
    ];
  }

  return {
    presets,
    plugins,
    ignore: ["*.stories.tsx"],
  };
};
