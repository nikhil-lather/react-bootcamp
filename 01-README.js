// file extensions
.jsx 
javascript  XML
javascript + html

// npm run dev :: to run project intially 

// function vs class based components

// functional based components are the most common way to write components in React. They are simpler and easier to read than class-based components.
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
export default App;

// class based components are more complex and require more boilerplate code. 
// they were used in the past when React did not have hooks, but they are still supported in React today.

babeljs.io is a tool that allows you to see how JSX is transformed into javascript

// imports and exports in React

1. Named Export

Exports multiple values from a file.

Syntax
export const name = "Nikhil";

export function greet() {
  console.log("Hello");
}
Import
import { name, greet } from "./file";
✅ Must use same name.

2. Default Export
Exports only one main value.
Syntax
export default function App() {
  return <h1>Hello</h1>;
}

Import
import App from "./App";
or
import MyComponent from "./App";
✅ Can rename while importing.

3. Multiple Named Exports
export const age = 22;
export const city = "Delhi";
export const country = "India";

Import
import { age, city, country } from "./data";

4. Default + Named Export Together
export default App;
export const name = "Nikhil";
export const age = 22;

Import
import App, { name, age } from "./App";

5. Import Everything (Namespace Import)
export const add = () => {};
export const subtract = () => {};

Import
import * as MathUtils from "./math";

Usage
MathUtils.add();
MathUtils.subtract();

6. Alias Import (Rename)
Useful when names conflict.
import { add as sum } from "./math";

Now use
sum();

7. Alias Export
const name = "Nikhil";
export { name as username };

Import
import { username } from "./file";


9. Barrel Export (index.js)

Instead of

import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

Create

// index.js

export { default as Button } from "./Button";
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";

Now

import { Button, Navbar, Footer } from "./components";

✅ Cleaner imports.

10. Side Effect Import

Imports a file just to execute it.

import "./App.css";

No variable is imported.

Mostly used for

CSS
Global styles
Polyfills

11. Import JSON
import data from "./data.json";

12. Import Images
import logo from "./logo.png";

Usage

<img src={logo} />

13. Import CSS Module
import styles from "./Button.module.css";

Usage

<button className={styles.btn}>

14. Dynamic Import (Lazy Loading)

Loads only when needed.

const About = React.lazy(() => import("./About"));

Use with

<Suspense fallback={<Loading />}>
  <About />
</Suspense>
15. Import from npm Package
import axios from "axios";

or

import { useState } from "react";

No relative path because package comes from node_modules.

