useRef Hook in React

useRef is a React Hook that lets you store a value that persists between renders without causing a re-render when it changes.

Syntax
import { useRef } from "react";

const ref = useRef(initialValue);
initialValue → The initial value of the ref.
Returns an object:
{
  current: initialValue
}

You access or update the value using .current.

Why do we use useRef?

There are mainly two use cases:

Accessing DOM elements directly.
Storing mutable values that don't trigger re-renders.
1. Accessing DOM Elements

One of the most common uses of useRef is interacting directly with HTML elements.

Example:

import { useRef } from "react";

function App() {
  const inputRef = useRef();

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}

export default App;
How it works

Initially,

const inputRef = useRef();

creates

{
   current: undefined
}

After React renders,

<input ref={inputRef} />

React automatically changes it to

{
   current: HTMLInputElement
}

So now,

inputRef.current.focus();

calls the browser's focus() method on that input.

Another Example

Clear the input.

import { useRef } from "react";

function App() {
  const inputRef = useRef();

  function clearInput() {
    inputRef.current.value = "";
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={clearInput}>Clear</button>
    </>
  );
}
2. Store Values Without Re-rendering

Unlike useState, changing a ref does not re-render the component.

Example:

import { useRef } from "react";

function App() {
  const count = useRef(0);

  function increase() {
    count.current++;
    console.log(count.current);
  }

  return (
    <>
      <button onClick={increase}>Increase</button>
    </>
  );
}

Clicking the button prints

1
2
3
4

but the UI does not update because React doesn't know the ref changed.

useState vs useRef
useState
const [count, setCount] = useState(0);

setCount(count + 1);
Changes value
Re-renders component
UI updates automatically
useRef
const count = useRef(0);

count.current++;
Changes value
No re-render
UI stays the same
Example Showing the Difference
import { useRef, useState } from "react";

function App() {
  const refCount = useRef(0);
  const [stateCount, setStateCount] = useState(0);

  return (
    <>
      <h2>State: {stateCount}</h2>
      <h2>Ref: {refCount.current}</h2>

      <button onClick={() => setStateCount(stateCount + 1)}>
        Increase State
      </button>

      <button onClick={() => refCount.current++}>
        Increase Ref
      </button>
    </>
  );
}

When you click Increase Ref, refCount.current changes, but the displayed value won't update until another render happens (for example, by clicking Increase State).

Why doesn't useRef cause a re-render?

React tracks changes made with useState. When you call its setter (setState), React schedules a re-render.

With useRef, React returns the same object on every render:

const ref = {
  current: 0
};

When you do:

ref.current = 10;

you're only changing a property of that object—not replacing the object itself. Since React doesn't track changes to .current, it doesn't re-render the component.

Persisting Values Between Renders

A normal variable resets on every render.

function App() {
  let count = 0;

  function handleClick() {
    count++;
    console.log(count);
  }

  return <button onClick={handleClick}>Click</button>;
}

If the component re-renders, count becomes 0 again.

Using useRef:

function App() {
  const count = useRef(0);

  function handleClick() {
    count.current++;
    console.log(count.current);
  }

  return <button onClick={handleClick}>Click</button>;
}

Now the value is preserved across renders.

Common Methods Used with DOM Refs
inputRef.current.focus();

Focus the input.

inputRef.current.blur();

Remove focus.

inputRef.current.value = "";

Clear the input.

inputRef.current.select();

Select all text inside the input.

inputRef.current.scrollIntoView();

Scroll the element into view.

When should you use useRef?

✅ Accessing DOM elements

inputRef.current.focus();

✅ Storing timer IDs

const timerRef = useRef();

timerRef.current = setInterval(...);

✅ Storing previous values

const previousValue = useRef();

✅ Keeping mutable values that shouldn't trigger UI updates

const renderCount = useRef(0);
When should you not use useRef?

❌ Don't use it for data that should update the UI.

Wrong:

const count = useRef(0);

count.current++;

The screen won't update.

Correct:

const [count, setCount] = useState(0);

setCount(count + 1);

Use useState whenever the UI needs to reflect the updated value.

Interview Notes
useRef stores mutable values that persist across renders.
Updating ref.current does not cause a re-render.
useRef returns the same object on every render.
Commonly used to access DOM elements and store mutable values like timers or previous state.
Use useState for UI data; use useRef for values that don't need to trigger rendering.