import { install, add } from "husky";

install();

add(".husky/pre-commit", "npm run format");
