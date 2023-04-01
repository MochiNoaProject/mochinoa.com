/** @type {import('eslint').Linter.BaseConfig} */
const config = {
  extends: ["matsuri"],
  rules: {
    "rulesdir/naming-convention": 0,
  },
};

module.exports = config;
