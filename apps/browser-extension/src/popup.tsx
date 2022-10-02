import { render } from "preact";
import { App } from "./components/app";

const root = document.getElementById("app");

if (root !== null) {
  render(<App />, root);
}
