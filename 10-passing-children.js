The children prop is a special prop in React that contains whatever you place between the opening and closing tags of a component.

Instead of writing:

<Component />

you write:

<Component>
  Something here
</Component>

Everything inside <Component>...</Component> is automatically available as children.

Basic Example
Parent
function App() {
  return (
    <Card>
      Hello React!
    </Card>
  );
}
Child
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
Output
+------------------+
| Hello React!     |
+------------------+

React internally treats it like this:

<Card children="Hello React!" />
Passing Text
<Card>
  Welcome to React
</Card>
function Card({ children }) {
  return <div>{children}</div>;
}

Output:

Welcome to React
Passing HTML/JSX
<Card>
  <h1>React</h1>
  <p>Learning children prop.</p>
</Card>

Child

function Card({ children }) {
  return <div>{children}</div>;
}

Output

<div>
  <h1>React</h1>
  <p>Learning children prop.</p>
</div>

The children prop is not limited to text—it can contain any valid React node.

Passing Another Component
function Button() {
  return <button>Click Me</button>;
}

function App() {
  return (
    <Card>
      <Button />
    </Card>
  );
}

Child

function Card({ children }) {
  return <div>{children}</div>;
}

Output

+------------------+
| [ Click Me ]     |
+------------------+

Here, the <Button /> component becomes the value of children.

Passing Multiple Elements
<Card>
  <h1>Title</h1>
  <p>Description</p>
  <button>Read More</button>
</Card>

Child

function Card({ children }) {
  return <section>{children}</section>;
}

Output

Title

Description

[Read More]

When there are multiple children, React groups them together so they can all be rendered with {children}.

Passing Expressions
function App() {
  const name = "Nikhil";

  return (
    <Card>
      <h1>Hello {name}</h1>
    </Card>
  );
}

Output

Hello Nikhil

Any valid JSX expression can be passed as children.

Mixing Everything
<Card>
  Welcome
  <h2>React</h2>
  <button>Start</button>
  {10 + 20}
</Card>

Child

function Card({ children }) {
  return <div>{children}</div>;
}

Output

Welcome

React

[Start]

30

children can contain a mix of strings, JSX elements, components, and expressions.

Passing children Explicitly

Normally, React creates the children prop for you:

<Card>
  Hello
</Card>

is equivalent to:

<Card children="Hello" />

You can even pass JSX directly:

<Card
  children={
    <>
      <h1>Hello</h1>
      <button>Click</button>
    </>
  }
/>

This works, but it's uncommon because the nested syntax is much cleaner.

Why Use children?

Imagine a reusable Card component:

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

Now you can reuse it with different content:

<Card>
  <h1>Profile</h1>
</Card>

<Card>
  <img src="logo.png" alt="Logo" />
</Card>

<Card>
  <button>Login</button>
</Card>

The Card component doesn't need to know what it's displaying—it simply renders whatever is passed as children. This makes components flexible and reusable.

Key Takeaways
children is a special React prop.
It automatically contains everything between a component's opening and closing tags.
It can hold:
Text
JSX elements
React components
Numbers
Expressions
Multiple elements
You render it using {children}.
It's commonly used to build reusable wrapper components like cards, modals, layouts, dialogs, and containers.

A simple way to think about it is:

<Card>
  Anything you put here
</Card>

becomes

function Card({ children }) {
  return <div>{children}</div>;
}

where children is simply the content that was placed inside the <Card> tags.

Sure. Here's the same example without destructuring.

App.jsx
function App() {
  return (
    <Card>
      <h1>Welcome</h1>
      <p>This is the children prop.</p>
      <button>Click Me</button>
    </Card>
  );
}

export default App;
Card.jsx
function Card(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default Card;