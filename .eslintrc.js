module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-unused-vars": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-empty": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/valid-v-for": process.env.NODE_ENV === "production" ? "warn" : "off",
  }
};
