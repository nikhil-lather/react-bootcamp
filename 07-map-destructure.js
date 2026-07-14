key is used if changes happen react dont have to re-render the whole list, it will only re-render the changed item.
// doubt cleared
1. First (❌ Doesn't Work)
users.map((user) => {
  <h1>{user.name}</h1>;
});

Here you're using curly braces {}.

When an arrow function has curly braces, JavaScript expects you to explicitly return a value.

This is equivalent to:

users.map(function (user) {
  <h1>{user.name}</h1>;
});

Notice there is no return, so JavaScript returns undefined.

Internally, it's like this:

users.map((user) => {
  <h1>{user.name}</h1>;

  return undefined;
});

So React receives:

[undefined, undefined, undefined]

Nothing gets rendered.

2. Second (✅ Works)
users.map((user) => {
  return <h1>{user.name}</h1>;
});

Again, you're using curly braces, so you must write return.

Each iteration returns JSX.
. Third (✅ Works)
users.map((user) => (
  <h1>{user.name}</h1>
));

Here you're using parentheses (), not curly braces.

With parentheses, an arrow function performs an implicit return.

vaScript automatically treats it as:

users.map((user) => {
  return <h1>{user.name}</h1>;
});

// using destructuring

const users = [
  {
    id: 1,
    name: "Nikhil",
    age: 22,
    role: "Frontend Developer",
  },
  {
    id: 2,
    name: "Rahul",
    age: 24,
    role: "Backend Developer",
  },
];

function App() {
  return (
    <div>
      {users.map(({ id, name, age, role }) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{age}</p>
          <p>{role}</p>
        </div>
      ))}
    </div>
  );
}

Without destructuring
users.map((user) => (
  <div key={user.id}>
    <h2>{user.name}</h2>
  </div>
));
With destructuring
users.map(({ id, name }) => (
  <div key={id}>
    <h2>{name}</h2>
  </div>
));

Destructuring Inside the Function Body

You don't have to destructure in the parameter list. You can do it inside the function.

users.map((user) => {
  const { id, name, age, role } = user;

  return (
    <div key={id}>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{role}</p>
    </div>
  );
});

This is useful if you need additional logic before returning JSX.

Nested Destructuring Example

Suppose your data looks like this:

const users = [
  {
    id: 1,
    name: "Nikhil",
    address: {
      city: "Delhi",
      country: "India",
    },
  },
];

You can destructure nested objects too:

users.map(({ id, name, address: { city, country } }) => (
  <div key={id}>
    <h2>{name}</h2>
    <p>{city}</p>
    <p>{country}</p>
  </div>
));