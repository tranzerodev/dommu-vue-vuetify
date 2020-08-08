module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["prettier"],
  extends: ["prettier", "plugin:vue/essential"],
  rules: {
    "no-console": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": "error",
    "vue/valid-v-for": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
