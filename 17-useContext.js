useContext Hook in React

useContext is a React Hook that allows you to access data from a Context without passing it manually through props.

It helps solve prop drilling, where the same data has to be passed through multiple components even though intermediate components don't use it.

What is Prop Drilling?

Suppose your component tree looks like this:

App
 │
 ├── Parent
 │      │
 │      ├── Child
 │      │      │
 │      │      ├── GrandChild

Assume App has the user's name.

Without Context:

<App user="Nikhil" />

App passes it to Parent

↓

Parent passes it to Child

↓

Child passes it to GrandChild

↓

GrandChild finally uses it.

Even though Parent and Child don't need the data, they still have to pass it.

This is called Prop Drilling.

How Context Solves This

Instead of passing props through every component,

React creates a shared data store (Context).

Any component inside that Context can access the data directly.

        Context
           │
           ▼
App (Provider)
 │
 ├── Parent
 │
 ├── Child
 │
 ├── GrandChild ← Reads data directly
Steps to Use useContext

There are 3 steps:

Create Context
Provide Context
Consume Context
Step 1: Create Context

Create a file called UserContext.js

import { createContext } from "react";

const UserContext = createContext();

export default UserContext;
What does createContext() do?

It creates a Context object.

const UserContext = createContext();

Think of it like creating an empty box that can hold shared data.

Step 2: Provide Context

Wrap the components that need access.

import UserContext from "./UserContext";

function App() {
  return (
    <UserContext.Provider value="Nikhil">
      <Parent />
    </UserContext.Provider>
  );
}
Explanation

Provider makes the value available to every component inside it.

<UserContext.Provider value="Nikhil">

Here,

value = "Nikhil"

becomes globally available to all nested components.

Step 3: Consume Context

Suppose GrandChild needs the value.

import { useContext } from "react";
import UserContext from "./UserContext";

function GrandChild() {
  const user = useContext(UserContext);

  return <h2>{user}</h2>;
}

Output

Nikhil

Notice that neither Parent nor Child received or passed any props.

Complete Example
UserContext.js
import { createContext } from "react";

const UserContext = createContext();

export default UserContext;
App.js
import Parent from "./Parent";
import UserContext from "./UserContext";

function App() {
  return (
    <UserContext.Provider value="Nikhil">
      <Parent />
    </UserContext.Provider>
  );
}

export default App;
Parent.js
import Child from "./Child";

function Parent() {
  return <Child />;
}

export default Parent;
Child.js
import GrandChild from "./GrandChild";

function Child() {
  return <GrandChild />;
}

export default Child;
GrandChild.js
import { useContext } from "react";
import UserContext from "./UserContext";

function GrandChild() {
  const user = useContext(UserContext);

  return <h2>Hello {user}</h2>;
}

export default GrandChild;

Output

Hello Nikhil
Passing Objects

You can pass any JavaScript value, not just strings.

<UserContext.Provider
  value={{
    name: "Nikhil",
    age: 22,
    city: "Delhi"
  }}
>

Consume it like this:

const user = useContext(UserContext);

console.log(user.name);
console.log(user.age);
Passing State

A common use is to share state across components.

import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}

Consume it:

const { theme, setTheme } = useContext(ThemeContext);

<button onClick={() => setTheme("dark")}>
  Dark Mode
</button>

Now every component using ThemeContext sees the updated theme.

Why Does Context Update Components?

When the value passed to a Provider changes, React automatically re-renders all components that use that context.

Example:

const [count, setCount] = useState(0);

<CountContext.Provider value={count}>

Whenever count changes,

setCount(count + 1);

React updates all components using:

useContext(CountContext);
Multiple Contexts

You can use more than one context in the same component.

const user = useContext(UserContext);
const theme = useContext(ThemeContext);

Each call reads from a different Provider.

When Should You Use Context?

✅ Theme (Light/Dark Mode)

theme
setTheme()

✅ Logged-in User

user
setUser()

✅ Language

English
Hindi
Spanish

✅ Authentication

isLoggedIn
login()
logout()

✅ Shopping Cart

cart
addItem()
removeItem()
When Should You NOT Use Context?

Context is great for shared global data, but it isn't meant for every piece of state.

Don't use it for:

Local state used by only one component.
Data that can be passed through one or two levels of props without making the code harder to understand.

For complex global state (large applications with many updates), libraries like Redux, Zustand, or React Query may be more suitable depending on the problem you're solving.


Interview Notes
useContext lets a component read data from a React Context.
It is mainly used to avoid prop drilling.
A Context is created with createContext().
Wrap components with <Context.Provider value={...}>.
Access the value using useContext(ContextName).
Context can store strings, objects, arrays, functions, or state.
Components using a context automatically re-render when the Provider's value changes.
Use Context for shared application data like themes, authentication, language, or user information—not for every state in your app.

/////////////////////////////////////////////////////////////////

Context can store strings, objects, arrays, functions, or state.
gimme an example of each 

Here are examples of the different types of values you can store in a React Context.

1. String
<UserContext.Provider value="Nikhil">
  <App />
</UserContext.Provider>

Consume it:

const user = useContext(UserContext);

console.log(user); // Nikhil
2. Number
<AgeContext.Provider value={22}>
  <App />
</AgeContext.Provider>

Consume it:

const age = useContext(AgeContext);

console.log(age); // 22
3. Boolean
<AuthContext.Provider value={true}>
  <App />
</AuthContext.Provider>

Consume it:

const isLoggedIn = useContext(AuthContext);

console.log(isLoggedIn); // true
4. Object
<UserContext.Provider
  value={{
    name: "Nikhil",
    age: 22,
    city: "Delhi",
  }}
>
  <App />
</UserContext.Provider>

Consume it:

const user = useContext(UserContext);

console.log(user.name); // Nikhil
console.log(user.age);  // 22
console.log(user.city); // Delhi
5. Array
<SkillsContext.Provider
  value={["React", "Node.js", "MongoDB"]}
>
  <App />
</SkillsContext.Provider>

Consume it:

const skills = useContext(SkillsContext);

console.log(skills[0]); // React
console.log(skills[1]); // Node.js
6. Function

You can share a function through Context.

function greet() {
  alert("Welcome!");
}

<UserContext.Provider value={greet}>
  <App />
</UserContext.Provider>

Consume it:

const greet = useContext(UserContext);

<button onClick={greet}>Click Me</button>

When the button is clicked:

Welcome!
7. State (Most Common)

Usually, you pass both the state and its setter so any component can read and update it.

import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}

Consume it:

const { theme, setTheme } = useContext(ThemeContext);

return (
  <>
    <h2>{theme}</h2>

    <button onClick={() => setTheme("dark")}>
      Dark Mode
    </button>
  </>
);

Output:

light

(Button Click)

dark
8. Mixed Values (Very Common in Real Projects)

Most real applications pass an object containing multiple values and functions.

<UserContext.Provider
  value={{
    user: "Nikhil",
    age: 22,
    isLoggedIn: true,
    login: () => console.log("Logged In"),
    logout: () => console.log("Logged Out"),
  }}
>
  <App />
</UserContext.Provider>

Consume it:

const { user, age, isLoggedIn, login, logout } =
  useContext(UserContext);

console.log(user);         // Nikhil
console.log(age);          // 22
console.log(isLoggedIn);   // true

login();   // Logged In
logout();  // Logged Out
Quick Interview Note

Context.Provider's value prop can hold any valid JavaScript value, including:

✅ String → "Nikhil"
✅ Number → 22
✅ Boolean → true
✅ Object → { name: "Nikhil" }
✅ Array → ["React", "Node.js"]
✅ Function → login()
✅ State → { theme, setTheme } (most common pattern)

remember one thing always try to pass an object while using Context with multiple values and functions in real projects. It keeps your code organized and makes it easier to manage shared state across components.