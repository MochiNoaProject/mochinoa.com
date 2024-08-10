import config from "eslint-config-matsuri";

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    ignores: ["**/styled-system/**"],
  },
  ...config,
];
