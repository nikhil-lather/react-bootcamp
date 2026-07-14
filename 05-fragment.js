A Fragment lets you group multiple JSX elements without adding an extra HTML element to the DOM.

Why do we need Fragments?

A React component must return a single parent element.

❌ Wrong

function App() {
  return (
    <h1>Hello</h1>
    <p>Welcome</p>
  );
}

This gives an error because there are two sibling elements.

Without Fragment

You might wrap everything in a <div>:

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome</p>
    </div>
  );
}

Output in DOM

<div>
  <h1>Hello</h1>
  <p>Welcome</p>
</div>

Sometimes this extra <div> is unnecessary.

With Fragment
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <h1>Hello</h1>
      <p>Welcome</p>
    </Fragment>
  );
}

Output in DOM

<h1>Hello</h1>
<p>Welcome</p>

No extra wrapper is added.

Short Syntax (<> </>)

Instead of importing Fragment:

function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome</p>
    </>
  );
}

This is the most common way to use fragments.

When to Use Fragment Instead of <>

Use <Fragment> when you need to provide a key.

import { Fragment } from "react";

items.map((item) => (
  <Fragment key={item.id}>
    <h2>{item.name}</h2>
    <p>{item.price}</p>
  </Fragment>
));

shorthand syntax cannot take a key: