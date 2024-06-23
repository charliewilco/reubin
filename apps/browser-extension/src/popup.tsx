import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

const element = document.getElementById("app");

if (element === null) {
	throw new Error("Element with id 'app' not found");
}

const root = createRoot(element);

root.render(<App />);
