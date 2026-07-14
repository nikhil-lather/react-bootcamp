Event handling in React is how you make your application respond to user actions, such as:

Clicking a button
Typing in an input
Submitting a form
Hovering over an element
Pressing a key

React events are very similar to JavaScript events, but there are a few important differences.

Basic Syntax

In HTML, you write:

<button onclick="alert('Hello')">Click</button>

In React, you write:

<button onClick={handleClick}>Click</button>

Notice:

onclick → onClick (camelCase)
Instead of a string, you pass a function.
Example 1: Button Click
function App() {
  function handleClick() {
    alert("Button Clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
Flow
User clicks button
        ↓
onClick event fires
        ↓
handleClick() runs
        ↓
Alert appears
Example 2: Using an Arrow Function
function App() {
  return (
    <button onClick={() => alert("Hello React")}>
      Click Me
    </button>
  );
}

This is fine for simple actions.

Example 3: Passing Arguments

Suppose you want to know which product was clicked.

Wrong ❌

<button onClick={buyProduct(10)}>
  Buy
</button>

This calls the function immediately while rendering.

Correct ✅

function App() {
  function buyProduct(id) {
    alert(`Buying Product ${id}`);
  }

  return (
    <button onClick={() => buyProduct(10)}>
      Buy
    </button>
  );
}

The arrow function delays the call until the click happens.

Example 4: Event Object

React automatically passes an event object.

function App() {
  function handleClick(event) {
    console.log(event);
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}

The event object contains information about the event.

Example properties:

event.target
event.type
event.currentTarget
Example 5: Input Change
function App() {
  function handleChange(event) {
    console.log(event.target.value);
  }

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Enter name"
    />
  );
}

If the user types:

N
Ni
Nik
Nikhil

Console:

N
Ni
Nik
Nikhil

event.target.value is the current value of the input.

Example 6: Form Submit

Normally, a form reloads the page when submitted.

function App() {
  function handleSubmit(event) {
    event.preventDefault();

    alert("Form Submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button>Submit</button>
    </form>
  );
}

event.preventDefault() prevents the browser's default behavior (page reload).

Example 7: Mouse Events
function App() {
  return (
    <button
      onMouseEnter={() => console.log("Mouse Enter")}
      onMouseLeave={() => console.log("Mouse Leave")}
    >
      Hover Me
    </button>
  );
}
Example 8: Keyboard Events
function App() {
  function handleKeyDown(event) {
    console.log(event.key);
  }

  return (
    <input
      onKeyDown={handleKeyDown}
      placeholder="Press any key"
    />
  );
}

If you press:

A

Console:

a

If you press Enter:

Enter
Common React Events
Event	Trigger
onClick	Button clicked
onChange	Input value changes
onSubmit	Form submitted
onKeyDown	Key pressed
onKeyUp	Key released
onMouseEnter	Mouse enters element
onMouseLeave	Mouse leaves element
onFocus	Input gets focus
onBlur	Input loses focus
Common Mistakes
❌ Calling the function immediately
<button onClick={handleClick()}>

Runs during rendering.

✅ Pass the function reference
<button onClick={handleClick}>

Runs only when clicked.

❌ Passing arguments directly
<button onClick={deleteUser(5)}>
✅ Wrap it
<button onClick={() => deleteUser(5)}>
Event Flow
User Action
     │
     ▼
React Event (onClick, onChange...)
     │
     ▼
Handler Function Executes
     │
     ▼
Your Code Runs
Interview Questions

1. Why do we write onClick={handleClick} instead of onClick={handleClick()}?

Because handleClick passes a function reference. handleClick() executes the function immediately during rendering.

2. When should you use an arrow function in an event handler?

Use it when you need to:

Pass arguments
Execute multiple statements

Example:

<button onClick={() => deleteUser(5)}>
  Delete
</button>

3. What is event.preventDefault()?

It prevents the browser's default action, such as reloading the page on form submission or following a link.

Next Topic

The natural next topic is useState, because event handlers are usually used to update state when a user interacts with your application.

3. What is event.preventDefault()?
explain about this in two lines with little example

event.preventDefault() prevents the browser's default behavior for an event, allowing React (or your own code) to control what happens instead.

Without event.preventDefault() → The page reloads after clicking Submit.
With event.preventDefault() → The page doesn't reload, and only your handleSubmit() code runs.

event is a object that contains information about the event like button clicked, such as the type of event, the target element, and other properties. It is automatically passed to event handler functions in React.