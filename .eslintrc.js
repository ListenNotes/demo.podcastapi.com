module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {},

  "overrides": [
    {
      "files": ["**/functions/**/*.js"],
      "env": {
        "node": false,
        "worker": true,
        "commonjs": true,
        "es2021": true
      },
      "parserOptions": {
        "sourceType": "module"
      },
      "globals": {
        "HTMLRewriter": "readonly"
      }
    }
  ]
};
