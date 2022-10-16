import { install, add } from "husky";

if (!process.env.CI) {
  install();

  add(".husky/pre-commit", "npm run format");
}
