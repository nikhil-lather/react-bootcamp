map() Method in React

The map() method is one of the most commonly used methods in React. It is used to render lists of data dynamically.

Definition:
map() loops through an array and returns a new array. In React, it is mainly used to return JSX elements for each item.

Syntax
array.map((item, index) => {
  return (
    <JSX />
  );
});

or (most common)

array.map((item) => (
  <JSX />
));
Basic JavaScript Example
const numbers = [1, 2, 3];

const doubled = numbers.map((num) => num * 2);

console.log(doubled);

Output

[2, 4, 6]

Notice:

Original array doesn't change.
map() returns a new array.
Why use map() in React?

Imagine you have data:

const fruits = ["Apple", "Banana", "Mango"];

Instead of writing

<li>Apple</li>
<li>Banana</li>
<li>Mango</li>

You can generate them dynamically.

function App() {
  const fruits = ["Apple", "Banana", "Mango"];

  return (
    <ul>
      {fruits.map((fruit) => (
        <li>{fruit}</li>
      ))}
    </ul>
  );
}

Output

• Apple
• Banana
• Mango
Mapping Objects (Most Common)

Most React applications receive data as objects.

const users = [
  {
    id: 1,
    name: "Nikhil",
    age: 22,
  },
  {
    id: 2,
    name: "Rahul",
    age: 24,
  },
];

Render them:

function App() {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.age}</p>
        </div>
      ))}
    </div>
  );
}

Output

Nikhil
22

Rahul
24
Why do we write {} ?

Because JSX allows JavaScript only inside curly braces.

<div>
  {users.map(...)}
</div>

Without {}

<div>
  users.map(...)
</div>

React treats it as plain text.

Why use key?

React needs to know which element changed after re-render.

users.map((user) => (
  <div key={user.id}>
    {user.name}
  </div>
))

Good

key={user.id}

Bad

key={index}

Using the index can cause issues when items are inserted, removed, or reordered because React may associate the wrong DOM element with the wrong data.

What is item?
users.map((user) => ...)

Here

user

represents one object from the array.

Iteration

First time

{
 id:1,
 name:"Nikhil"
}

Second time

{
 id:2,
 name:"Rahul"
}
What is index?
users.map((user, index) => (
    ...
))

Suppose

["A", "B", "C"]

Then

user = "A"
index = 0

user = "B"
index = 1

user = "C"
index = 2
Arrow Function Styles
Implicit Return
users.map((user) => (
    <h1>{user.name}</h1>
))

No return keyword.

Explicit Return
users.map((user) => {
    return (
        <h1>{user.name}</h1>
    );
})

Used when writing multiple lines of logic.

Example

users.map((user) => {
    const upper = user.name.toUpperCase();

    return <h1>{upper}</h1>;
});
Rendering Cards
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 25000,
  },
];
function App() {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
Rendering Components with map()

Instead of writing JSX directly

function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  );
}
function App() {
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </>
  );
}

This is the most common pattern in real-world React apps.

Filtering Before Mapping
const users = [
  { id: 1, name: "Nikhil", active: true },
  { id: 2, name: "Rahul", active: false },
  { id: 3, name: "Ankit", active: true },
];
{
users
.filter((user) => user.active)
.map((user) => (
    <h2 key={user.id}>{user.name}</h2>
))
}

Output

Nikhil
Ankit
Conditional Rendering Inside map()
{
users.map((user) => (
    <div key={user.id}>
        {user.age >= 18 ? (
            <p>{user.name} is Adult</p>
        ) : (
            <p>{user.name} is Minor</p>
        )}
    </div>
))
}
Common Mistakes
1. Forgetting return

❌

users.map((user) => {
    <h1>{user.name}</h1>;
});

Nothing renders because there is no return.
bcoz
Here you're using curly braces {}.

When an arrow function has curly braces, JavaScript expects you to explicitly return a value.

✅

users.map((user) => {
    return <h1>{user.name}</h1>;
});

Or

users.map((user) => (
    <h1>{user.name}</h1>
));
2. Missing key

❌

users.map((user) => (
    <h2>{user.name}</h2>
))

React will warn:

Each child in a list should have a unique "key" prop.
3. Using forEach() Instead of map()

forEach() does not return a new array, so React cannot use it directly to render lists.

Interview Questions
1. Why do we use map() in React?

To convert an array of data into an array of JSX elements for rendering.

2. Does map() modify the original array?

No. It returns a new array and leaves the original unchanged.

3. Why is key required?

It helps React efficiently identify which list items have changed, been added, or been removed during reconciliation.

4. Can we use the array index as the key?

Yes, but only if the list is static and will never be reordered, inserted into, or have items removed. Otherwise, use a unique ID.

Quick Revision
map() loops over an array and returns a new array.
In React, it is primarily used to render lists of JSX.
Always provide a stable, unique key (prefer IDs).
Use () for implicit return and { return ... } for explicit return.
map() does not mutate the original array.
It is often combined with filter() and conditional rendering for dynamic UIs.

