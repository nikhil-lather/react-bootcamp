Performance Optimization in React

Performance optimization means making your React application render faster and avoid unnecessary work.

By default, whenever a component's state or props change, React re-renders that component. If not optimized, this can cause unnecessary re-renders and slow down large applications.

Why Do We Need Performance Optimization?

Imagine an e-commerce website.

App
├── Navbar
├── Sidebar
├── ProductList
│     ├── ProductCard 1
│     ├── ProductCard 2
│     ├── ProductCard 3
│     └── 1000 more...
└── Footer

Suppose you click a button in the Navbar.

Without optimization:

Navbar re-renders ✅
Sidebar re-renders ❌
ProductList re-renders ❌
1000 ProductCards re-render ❌
Footer re-renders ❌

Even though only the Navbar changed.

Optimization helps React skip unnecessary renders.

Common React Performance Optimization Techniques
React.memo
useMemo
useCallback
Code Splitting (React.lazy + Suspense)
Lazy Loading Images
List Virtualization
Proper Keys
Avoid Unnecessary State
Debouncing & Throttling
Optimizing Context
Memoizing Expensive Calculations
1. React.memo
Problem

Parent re-renders.

Child also re-renders even though props didn't change.

function Child() {
  console.log("Child Render");

  return <h2>Child</h2>;
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>

      <Child />
    </>
  );
}

Every click prints

Child Render

Although Child doesn't use count.

Solution
const Child = React.memo(function Child() {
  console.log("Child Render");

  return <h2>Child</h2>;
});

Now Child only re-renders if its props change.

Interview

Q: What does React.memo do?

It memoizes a component and prevents re-rendering when its props remain unchanged.

2. useMemo

Used to cache expensive calculations.

Imagine calculating factorial.

const factorial = (n) => {
  console.log("Calculating...");

  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
};

Without useMemo

const result = factorial(number);

Even changing unrelated state recalculates factorial.

Using useMemo
const result = useMemo(() => {
  return factorial(number);
}, [number]);

Now factorial runs only when number changes.

Interview

Q: Why use useMemo?

To avoid repeating expensive calculations on every render.

3. useCallback

Used to cache functions.

Without useCallback

function App() {

  const handleClick = () => {
    console.log("Clicked");
  };

  return <Child onClick={handleClick} />;
}

Every render creates

New Function

Even though it looks identical.

React compares references.

Old Function !== New Function

Child re-renders.

With useCallback
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);

Now the same function reference is reused.

Interview

Q: Difference between useMemo and useCallback?

useMemo	useCallback
Memoizes values	Memoizes functions
Returns a value	Returns a function
4. Code Splitting

Instead of loading the whole application,

Load only what the user needs.

Without Lazy Loading

Home
About
Products
Dashboard
Admin

↓↓↓

Everything downloads

With Lazy Loading

const Dashboard = React.lazy(() => import("./Dashboard"));
<Suspense fallback={<h1>Loading...</h1>}>
    <Dashboard />
</Suspense>

Dashboard downloads only when opened.

5. List Virtualization

Imagine

10,000 products

Rendering all of them is slow.

Instead,

Render only the visible items.

Libraries:

react-window
react-virtualized
6. Proper Keys

Wrong

items.map((item, index) => (
    <Card key={index} />
))

Correct

items.map((item) => (
    <Card key={item.id} />
))

Stable keys help React efficiently update only the changed items.

7. Avoid Unnecessary State

Bad

const [fullName, setFullName] = useState("");

If

firstName
lastName

already exist,

then

const fullName = `${firstName} ${lastName}`;

No need for extra state.

More state

↓

More renders

↓

Lower performance.

8. Debouncing

Search example.

Without debounce

User types

R
Re
Rea
Reac
React

Five API calls.

With debounce

Wait 500ms.

Only

React

is searched.

9. Throttling

Debounce

Wait
Wait
Wait

↓

Execute

Throttle

Execute

↓

Ignore

↓

Execute

↓

Ignore

Useful for

Scroll
Resize
Mouse movement
10. Optimizing Context

Context updates

Context changes

↓

Every consumer re-renders

If a context stores too many unrelated values, many components can re-render unnecessarily.

Better approach:

Split contexts.

Instead of

AppContext

Use

ThemeContext

UserContext

CartContext
11. Memoizing Expensive Objects

Bad

const person = {
    name: "John"
};

Every render creates

New Object

Better

const person = useMemo(() => ({
    name: "John"
}), []);
Real Interview Example

Imagine

<App>

<Search />

<ProductList />

<ProductCard />

</App>

Typing inside Search

should NOT re-render

100 Product Cards

Solution

React.memo(ProductCard)

+

useCallback()

+

useMemo()

Only Search updates.

React Rendering Flow
State Changes
      │
      ▼
Component Re-renders
      │
      ▼
Children Re-render
      │
      ▼
React compares Virtual DOM
      │
      ▼
Updates only changed DOM nodes

Optimization reduces unnecessary re-renders before React even reaches the DOM update stage.

Most Asked Interview Questions
1. What is React.memo?

Prevents a functional component from re-rendering if its props haven't changed (shallow comparison).

2. Difference between React.memo and useMemo?
React.memo	useMemo
Memoizes a component	Memoizes a computed value
Works on component props	Works on calculations/objects
Prevents unnecessary component renders	Prevents unnecessary recalculations
3. Difference between useMemo and useCallback?
useMemo	useCallback
Returns a value	Returns a function
Caches calculations	Caches function references
4. When should you use React.memo?

When:

A child component re-renders often.
Its props rarely change.
Rendering that child is expensive.

Avoid wrapping every component with React.memo; it also has a comparison cost.

5. Why does useCallback improve performance?

Because functions are recreated on every render. useCallback preserves the same function reference between renders (until dependencies change), helping memoized child components avoid unnecessary re-renders.

6. Why are keys important?

Keys help React identify which list items were added, removed, or reordered, allowing efficient reconciliation and preserving component state.

7. What is lazy loading?

Loading components only when they are needed, reducing the initial bundle size and improving page load time.

8. What is reconciliation?

Reconciliation is React's process of comparing the new Virtual DOM with the previous Virtual DOM to determine the minimal set of real DOM updates required.

One Example Connecting Everything
const ProductCard = React.memo(({ product, onAdd }) => {
  console.log("ProductCard Render");

  return (
    <>
      <h3>{product.name}</h3>
      <button onClick={() => onAdd(product.id)}>
        Add to Cart
      </button>
    </>
  );
});

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const products = useMemo(
    () => [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Phone" },
    ],
    []
  );

  const handleAdd = useCallback((id) => {
    setCart((prev) => [...prev, id]);
  }, []);

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={handleAdd}
        />
      ))}
    </>
  );
}
What happens?
Typing in the search box updates only search.
products keeps the same reference because of useMemo.
handleAdd keeps the same function reference because of useCallback.
ProductCard is wrapped with React.memo, so it sees that both product and onAdd props are unchanged.
As a result, the ProductCard components do not re-render while you type.

Quick Revision Table
Technique	Purpose	Use When
React.memo	Prevent unnecessary component re-renders	Child component props rarely change
useMemo	Cache expensive values/calculations	Expensive computations or stable object references
useCallback	Cache function references	Passing callbacks to memoized children
React.lazy + Suspense	Split code into smaller bundles	Large applications/routes
Virtualization	Render only visible list items	Very long lists (thousands of items)
Debounce	Delay execution until typing stops	Search boxes, API calls
Throttle	Limit execution frequency	Scroll, resize, mouse events
Stable Keys	Efficient list updates	Rendering lists
Split Contexts	Reduce context-triggered re-renders	Large apps with multiple global states
Interview Tip

Don't say that React.memo, useMemo, or useCallback always make an app faster. They introduce their own overhead. The key is to use them when you've identified unnecessary re-renders or expensive computations, not everywhere by default. This demonstrates a deeper understanding in interviews.