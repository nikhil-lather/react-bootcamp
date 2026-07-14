1. if...else (Simple)
function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome</h1>;
  }

  return <h1>Please Login</h1>;
}
2. Ternary (Simple)
function App() {
  const age = 20;

  return (
    <h1>
      {age >= 18 ? "Adult" : "Minor"}
    </h1>
  );
}
3. Logical AND (&&) (Simple)
function App() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin && <button>Delete User</button>}
    </div>
  );
}

If isAdmin is false, nothing is rendered.

4. map() + Ternary
const users = [
  { id: 1, name: "Nikhil", active: true },
  { id: 2, name: "Rahul", active: false },
];

function App() {
  return (
    <>
      {users.map(({ id, name, active }) => (
        <div key={id}>
          {active ? <h2>{name}</h2> : <p>{name} is Inactive</p>}
        </div>
      ))}
    </>
  );
}
5. map() + Logical AND (&&)
const users = [
  { id: 1, name: "Nikhil", premium: true },
  { id: 2, name: "Rahul", premium: false },
];

function App() {
  return (
    <>
      {users.map(({ id, name, premium }) => (
        <div key={id}>
          <h2>{name}</h2>
          {premium && <span>⭐ Premium User</span>}
        </div>
      ))}
    </>
  );
}

Only premium users see the ⭐ badge.

6. map() + if...else

Since you can't write if directly inside JSX, use it inside the callback and return JSX.

const users = [
  { id: 1, name: "Nikhil", age: 22 },
  { id: 2, name: "Rahul", age: 16 },
];

function App() {
  return (
    <>
      {users.map((user) => {
        if (user.age >= 18) {
          return <h2 key={user.id}>{user.name} - Adult</h2>;
        }

        return <h2 key={user.id}>{user.name} - Minor</h2>;
      })}
    </>
  );
}
💡 Interview Rule
✅ if...else → Complex logic or different returns.
✅ Ternary (? :) → Two possible outputs (most common).
✅ && → Show something only when the condition is true.