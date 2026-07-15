useState is a React Hook used to add state to functional components. State is data that can change over time, and when it changes, React re-renders the component.

Syntax
import { useState } from "react";

const [state, setState] = useState(initialValue);
state → Current value of the state.
setState → Function used to update the state.
initialValue → Initial value of the state.
Example 1: Counter
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;

Output:

Initial count = 0
Clicking the button increases the count.
Example 2: Storing Text
import React, { useState } from "react";

function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3>Hello, {name}</h3>
    </div>
  );
}

export default NameInput;
Example 3: Boolean State
import React, { useState } from "react";

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
Updating State Based on Previous State

When the new value depends on the previous value, use a callback:

setCount((prevCount) => prevCount + 1);

This is safer than:

setCount(count + 1);

especially when multiple updates happen quickly.

State with Objects
const [user, setUser] = useState({
  name: "John",
  age: 25,
});

setUser({
  ...user,
  age: 26,
});
State with Arrays
const [items, setItems] = useState([]);

setItems([...items, "Apple"]);
Key Points
useState is only used inside functional components.
Updating state causes the component to re-render.
Never modify state directly.

❌ Wrong:

count = count + 1;

✅ Correct:

setCount(count + 1);

or

setCount((prev) => prev + 1);
Summary
Feature	Description
useState(initialValue)	--> Creates a state variable
Returns -->	[state, setState]
state -->	Current value
setState()	--> Updates the state and re-renders the component
Can store	Numbers, strings, booleans, objects, arrays, etc.