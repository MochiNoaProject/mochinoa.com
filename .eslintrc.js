/** @type {import('eslint').Linter.BaseConfig} */
const config = {
  extends: ["matsuri"],
  rules: {
    "rulesdir/naming-convention": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
  },
};

module.exports = config;
