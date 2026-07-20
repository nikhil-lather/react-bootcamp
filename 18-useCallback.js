useMemo and useCallback are performance optimization hooks. They help React avoid unnecessary work, but they are not needed in every component.

A common interview question is:

Difference between useMemo and useCallback?

Simple answer:

useMemo memorizes a computed value.
useCallback memorizes a function.

1. useMemo Hook
What is it?

useMemo caches (remembers) the result of an expensive calculation and only recalculates it when its dependencies change.

Syntax
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
Without useMemo

Every time the component re-renders, the calculation runs again.

function App() {
  const [count, setCount] = useState(0);

  const square = count * count;

  return (
    <>
      <h1>{square}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

Here, square is recalculated on every render. This is fine because it's a simple calculation.

Real Example (Expensive Calculation)
import { useMemo, useState } from "react";

function App() {
  const [number, setNumber] = useState(5);
  const [theme, setTheme] = useState(false);

  const factorial = useMemo(() => {
    console.log("Calculating...");
    return findFactorial(number);
  }, [number]);

  return (
    <>
      <h2>{factorial}</h2>

      <button onClick={() => setNumber(number + 1)}>
        Number
      </button>

      <button onClick={() => setTheme(!theme)}>
        Theme
      </button>
    </>
  );
}
function findFactorial(n) {
  console.log("Running...");
  if (n === 0) return 1;

  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}
What happens?
Clicking Number → number changes → factorial recalculates ✅
Clicking Theme → only theme changes → factorial is reused from memory ✅

Without useMemo, the factorial would be recalculated even when only the theme changed.

When to use useMemo
Expensive calculations
Large array filtering
Sorting
Searching
Heavy computations

2. useCallback Hook
What is it?

useCallback returns the same function instance between renders unless its dependencies change.

Syntax
const memoizedFunction = useCallback(() => {
  // code
}, [dependencies]);
Without useCallback
function App() {
  const [count, setCount] = useState(0);

  function greet() {
    console.log("Hello");
  }

  return (
    <>
      <Child greet={greet} />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

Every render creates a new greet function.

Even though the code is identical, React sees it as a different function reference.

Render 1
greet ---> Address A

Render 2
greet ---> Address B

Render 3
greet ---> Address C

If Child is wrapped with React.memo, it will still re-render because the greet prop changes.

With useCallback
import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const greet = useCallback(() => {
    console.log("Hello");
  }, []);

  return (
    <>
      <Child greet={greet} />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

Now the function reference stays the same.

Render 1
greet ---> Address A

Render 2
greet ---> Address A

Render 3
greet ---> Address A

So a memoized child component won't re-render just because the parent rendered.

Real Example
Child
const Child = React.memo(({ greet }) => {
  console.log("Child Rendered");

  return <button onClick={greet}>Click</button>;
});
Parent
function App() {
  const [count, setCount] = useState(0);

  const greet = useCallback(() => {
    console.log("Hello");
  }, []);

  return (
    <>
      <Child greet={greet} />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

Now clicking Increment only re-renders the parent. The child skips rendering because:

React.memo compares props.
greet has the same reference.
Difference Between useMemo and useCallback
Feature	useMemo	useCallback
Returns	A value	A function
Used for	Expensive calculations	Function references
Prevents	Recalculating values	Recreating functions
Syntax	useMemo(() => value, [])	useCallback(() => {}, [])
Easy Way to Remember
useMemo
        ↓
Remembers a VALUE

5
100
[]
{}
filteredUsers
sortedProducts
useCallback
        ↓
Remembers a FUNCTION

handleClick()

handleSubmit()

fetchData()
Interview Example
const total = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.price, 0);
}, [cart]);

Here, total is a value, so useMemo is appropriate.

const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);

Here, handleClick is a function, so useCallback is appropriate.

When NOT to Use Them

Don't wrap everything in useMemo or useCallback.

❌ Unnecessary:

const name = useMemo(() => "Nikhil", []);
const sayHi = useCallback(() => {
  console.log("Hi");
}, []);

These add complexity without improving performance.

Interview Tip

A common interview question is:

Can useCallback replace useMemo?

Answer: No.

useMemo memoizes the result of a calculation (a value).
useCallback memoizes the function itself, not its return value.

Another common question:

Do we always need useCallback with React.memo?

Answer: Not always. Use it only when you're passing callback functions to memoized child components and recreating those functions is causing unnecessary re-renders. Otherwise, the extra complexity usually isn't worth it.

React.memo

Now let's see something completely different.

React.memo doesn't memorize values.

It memorizes components.

Without React.memo

function Child() {
  console.log("Child Render");

  return <h2>Child</h2>;
}

Parent

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Child />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

Click button

count changes

↓

Parent renders

↓

Child renders

↓

Child renders

↓

Child renders

Even though Child has no props.

Now use React.memo

const Child = React.memo(function Child() {
  console.log("Child Render");

  return <h2>Child</h2>;
});

Same Parent

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Child />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

Now

count changes

↓

Parent renders

↓

React checks Child props

↓

Props didn't change

↓

Skip Child render

Console

Parent Render

Parent Render

Parent Render

Child Render

Child rendered only once.

What if Child receives props?
const Child = React.memo(function Child({ name }) {
  console.log("Child");

  return <h2>{name}</h2>;
});

Parent

<Child name="Nikhil" />

Now click button.

React compares

Old prop

name = "Nikhil"

New prop

name = "Nikhil"

Same

↓

No Child render.

Now

<Child name={count} />

Click button

Old

0

New

1

Props changed

↓

React.memo allows Child to render.