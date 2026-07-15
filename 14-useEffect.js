useEffect is a React Hook used to perform side effects in functional components.

A side effect is anything that happens outside of rendering the UI, such as:

Fetching data from an API
Updating the document title
Starting or clearing a timer
Adding/removing event listeners
Saving data to localStorage
Syntax
import { useEffect } from "react";

useEffect(() => {
  // Side effect code

  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);

There are three parts:

Callback Function → Runs the side effect.
Cleanup Function (optional) → Runs before the effect runs again or when the component unmounts.
Dependency Array → Controls when the effect runs.
1. useEffect with No Dependency Array
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect Ran");
  });

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
Output
Initial render → Effect runs
Click button → Re-render → Effect runs again
Every render → Effect runs

Think of it like:

Render
↓

useEffect()

↓

Render Again

↓

useEffect()
2. Empty Dependency Array []
import { useEffect } from "react";

function App() {

  useEffect(() => {
    console.log("Runs only once");
  }, []);

  return <h1>Hello</h1>;
}
Output
Component Mounted
↓

useEffect runs once

↓

Never runs again

This is commonly used for:

API calls
Initial setup
Loading data

Example:

useEffect(() => {
  console.log("Fetching Users...");
}, []);
3. Dependency Array with Values
import { useState, useEffect } from "react";

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count Changed");
  }, [count]);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
Output
Page loads

↓

Effect runs

↓

count changes

↓

Effect runs again

↓

No count change

↓

Effect doesn't run

Only changes to count trigger the effect.

Multiple Dependencies
const [count, setCount] = useState(0);
const [name, setName] = useState("");

useEffect(() => {
  console.log("Count or Name changed");
}, [count, name]);

The effect runs if either count or name changes.

Cleanup Function

Sometimes you start something that should be stopped later.

Example: Timer

import { useEffect } from "react";

function App() {

  useEffect(() => {

    const id = setInterval(() => {
      console.log("Running...");
    }, 1000);

    return () => {
      clearInterval(id);
      console.log("Timer Cleared");
    };

  }, []);

  return <h1>Timer</h1>;
}

The cleanup function runs:

Before the effect runs again (if dependencies changed)
When the component unmounts

Without cleanup, the timer would keep running and could cause memory leaks.

Updating the Document Title
import { useState, useEffect } from "react";

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </>
  );
}

Every time count changes, the browser tab title updates.

Fetching Data
import { useEffect, useState } from "react";

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}

// how does users get populated?

// useEffect(() => {
//   fetch("https://jsonplaceholder.typicode.com/users")
// }, []);

// Now React sends an HTTP GET request to: https://jsonplaceholder.typicode.com/users

The data is fetched only once because the dependency array is empty.

Common Mistakes
❌ Missing Dependency
useEffect(() => {
  console.log(count);
}, []);

If count changes later, this effect won't run again. Include count if the effect depends on it.

❌ Updating State Without a Dependency Array
useEffect(() => {
  setCount(count + 1);
});

This causes an infinite loop:

Render
↓

Effect

↓

setCount()

↓

Render

↓

Effect

↓

setCount()

...
❌ Forgetting Cleanup
useEffect(() => {
  setInterval(() => {
    console.log("Hello");
  }, 1000);
}, []);

The interval keeps running even after the component is removed. Always clear intervals, timeouts, or event listeners in a cleanup function.

When Should You Use useEffect?

Use useEffect when you need to:

✅ Fetch API data
✅ Set or clear timers
✅ Add/remove event listeners
✅ Update the document title
✅ Sync with localStorage
✅ Connect to external services (e.g., WebSocket)

Avoid using useEffect for calculations or values you can derive directly during rendering.

Summary
Dependency Array	When It Runs
No array	After every render
[]	Once after the initial render (mount)
[count]	On mount and whenever count changes
[count, name]	On mount and whenever count or name changes
Interview Questions

Q1. Why do we use useEffect?
To perform side effects like API calls, timers, event listeners, and DOM updates after rendering.

Q2. What is the purpose of the dependency array?
It tells React when to re-run the effect based on changes to specific values.

Q3. What is a cleanup function?
It's a function returned from useEffect that cleans up resources (such as timers or event listeners) before the effect runs again or when the component unmounts.

Q4. Can I have multiple useEffect hooks in one component?
Yes. It's often better to split unrelated side effects into separate useEffect hooks to keep the code organized.


////////////////////////////////////////////////////////////////
// doubt
how does users gets data

Great question. Let's break it down step by step.

Here's the code again:

const [users, setUsers] = useState([]);

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => setUsers(data));
}, []);
Step 1: Initial Render
const [users, setUsers] = useState([]);

Initially:

users = []

The array is empty.

So when React renders:

{users.map((user) => (
  <p key={user.id}>{user.name}</p>
))}

it's actually doing:

[].map(...)

Since the array is empty, nothing is displayed.

Step 2: useEffect Runs

Because the dependency array is empty ([]), React runs the effect after the component is first rendered.

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
}, []);

Now React sends an HTTP GET request to:

https://jsonplaceholder.typicode.com/users
Step 3: Server Responds

The server sends back JSON data like this:

[
  {
    "id": 1,
    "name": "Leanne Graham"
  },
  {
    "id": 2,
    "name": "Ervin Howell"
  }
]
Step 4: Convert Response to JavaScript

The first .then() receives the response:

.then((res) => res.json())

Here:

res

is the HTTP response object, not the actual user data.

Calling:

res.json()

reads the JSON response and converts it into a JavaScript array.

Now the next .then() receives:

[
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" }
]
Step 5: Store Data in State
.then((data) => setUsers(data));

Here:

data =
[
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" }
]

Then:

setUsers(data);

updates the state.

So now:

users =
[
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" }
]
Step 6: React Re-renders

Whenever you call a state setter like setUsers, React re-renders the component.

Now this code:

users.map((user) => (
  <p key={user.id}>{user.name}</p>
))

becomes:

[
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" }
].map((user) => (
  <p key={user.id}>{user.name}</p>
))

React loops through the array and renders:

<p>Leanne Graham</p>
<p>Ervin Howell</p>
Complete Flow
Component Loads
       │
       ▼
users = []
       │
       ▼
React renders (Nothing shown)
       │
       ▼
useEffect runs
       │
       ▼
fetch() sends request
       │
       ▼
Server returns JSON
       │
       ▼
res.json() converts JSON to a JavaScript array
       │
       ▼
setUsers(data)
       │
       ▼
users state is updated
       │
       ▼
React re-renders
       │
       ▼
users.map() displays all users
Why does users automatically get the data?

It doesn't happen automatically. It happens because of this line:

setUsers(data);

setUsers updates the users state with the fetched data. Since React state changed, React re-renders the component, and users now contains the array returned from the API.

This pattern—fetch data inside useEffect → store it with setState → render it with map()—is one of the most common patterns you'll use in React applications.