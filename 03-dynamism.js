function App() {
  const name = "Nikhil";
  const age = 22;

  return (
    <h1>
      Hello, {name}, you are {age} years old.
    </h1>
  );
}

// to use inline css in react we need to use double braces {{"height" : "20px"}}

Ways to Make React Dynamic
1. Display Variables
const age = 22;

return <h1>Age: {age}</h1>;
2. Display Expressions
const a = 10;
const b = 20;

return <h1>{a + b}</h1>;

Output

30
3. Conditional Rendering
const isLoggedIn = true;

return (
  <h1>
    {isLoggedIn ? "Welcome" : "Please Login"}
  </h1>
);
4. Render Lists
const fruits = ["Apple", "Mango", "Orange"];

return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit}>{fruit}</li>
    ))}
  </ul>
);

React creates UI dynamically for every array item.

5. Event Handling
<button onClick={() => alert("Clicked")}>
  Click
</button>

UI reacts to user interaction.

6. Dynamic Styles
const isDark = true;

return (
  <h1 style={{ color: isDark ? "white" : "black" }}>
    Hello
  </h1>
);
7. Dynamic Classes
<button className={isLoggedIn ? "active" : "inactive"}>
  Login
</button>
8. State-Based Updates
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  {count}
</button>

Every state update automatically re-renders the component with the new value.

9. Dynamic Props
<UserCard name="Nikhil" age={22} />

Child component

function UserCard({ name, age }) {
  return <h1>{name} - {age}</h1>;
}
10. Dynamic Attributes
const image = "logo.png";

<img src={image} alt="Logo" />
JavaScript Inside JSX

Use {} to embed JavaScript expressions.

const name = "Nikhil";

<h1>Hello {name}</h1>