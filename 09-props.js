In React, props (short for properties) are used to pass data from a parent component to a child component. They make components reusable by allowing you to provide different values each time you use them.

Key points about props ::
Props are read-only (immutable). A child component should not modify them.
They allow components to communicate with each other.
Props can be strings, numbers, objects, arrays, functions, or even other React elements.

1. Passing String Props
Parent
function App() {
  return <User name="Nikhil" />;
}
Child
function User(props) {
  return <h1>{props.name}</h1>;
}

Output

Nikhil

or using destructuring

function User({ name }) {
  return <h1>{name}</h1>;
}
2. Passing Number Props
function App() {
  return <Student age={22} />;
}

Child

function Student({ age }) {
  return <h2>Age: {age}</h2>;
}

Output

Age: 22

Notice

age="22"    // String

age={22}    // Number

Anything inside {} is treated as JavaScript.

3. Passing Boolean Props
function App() {
  return <Button disabled={true} />;
}

Child

function Button({ disabled }) {
  return <button disabled={disabled}>Submit</button>;
}

Output

Disabled Button

Shortcut

<Button disabled />

means

<Button disabled={true} />
4. Passing Objects

Parent

function App() {
  const user = {
    name: "Nikhil",
    age: 22,
    city: "Delhi",
  };

  return <Profile user={user} />;
}

Child

function Profile({ user }) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.age}</p>
      <p>{user.city}</p>
    </>
  );
}

Output

Nikhil
22
Delhi

You can also destructure the object inside the child:

function Profile({ user }) {
  const { name, age, city } = user;

  return (
    <>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{city}</p>
    </>
  );
}
5. Passing Arrays

Parent

function App() {
  const skills = ["HTML", "CSS", "React"];

  return <Skills skills={skills} />;
}

Child

function Skills({ skills }) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}

Output

• HTML
• CSS
• React

The child simply receives the array and can use any array method like map(), filter(), etc.

6. Passing Functions

Very common in React.

The parent sends a function so the child can execute it.

Parent

function App() {
  function greet() {
    alert("Hello!");
  }

  return <Button greet={greet} />;
}

Child

function Button({ greet }) {
  return <button onClick={greet}>Click</button>;
}

Flow

Parent
   ↓
passes greet function
   ↓
Child receives it
   ↓
Button click
   ↓
greet() runs

Output

Alert: Hello!
Passing Functions with Arguments

Parent

function App() {
  function greet(name) {
    alert(`Hello ${name}`);
  }

  return <Button greet={greet} />;
}

Child

function Button({ greet }) {
  return (
    <button onClick={() => greet("Nikhil")}>
      Click
    </button>
  );
}

Output

Hello Nikhil

Notice we wrap it in an arrow function so it runs only when clicked, not during rendering.

7. Passing JSX (React Elements)

JSX is just another value, so you can pass it as a prop.

Parent

function App() {
  return (
    <Card
      title={<h1>React Course</h1>}
    />
  );
}

Child

function Card({ title }) {
  return (
    <div>
      {title}
    </div>
  );
}

Output

React Course

You can pass almost any JSX:

<Card
  title={<button>Buy Now</button>}
/>
8. Passing Multiple Props
function App() {
  return (
    <User
      name="Nikhil"
      age={22}
      city="Delhi"
    />
  );
}

Child

function User({ name, age, city }) {
  return (
    <>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{city}</p>
    </>
  );
}
9. Passing Everything Together

Parent

function App() {
  const user = {
    name: "Nikhil",
    age: 22,
  };

  const skills = ["React", "Node"];

  function greet() {
    alert("Welcome");
  }

  return (
    <Profile
      user={user}
      skills={skills}
      greet={greet}
      heading={<h1>Developer Profile</h1>}
    />
  );
}

Child

function Profile({
  user,
  skills,
  greet,
  heading,
}) {
  return (
    <>
      {heading}

      <h2>{user.name}</h2>

      <p>{user.age}</p>

      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <button onClick={greet}>
        Welcome
      </button>
    </>
  );
}
What Can Be Passed as Props?
Data Type	Example
String	name="Nikhil"
Number	age={22}
Boolean	isAdmin={true}
Object	user={user}
Array	skills={skills}
Function	onClick={handleClick}
JSX / React Element	icon={<HomeIcon />}
Null	data={null}
Undefined	value={undefined}
Interview Question: Are Props Mutable?

No. Props are read-only (immutable) inside the child component.

❌ Wrong:

function User({ name }) {
  name = "Rahul"; // Don't do this
}

✅ Correct:

If you need to change data, update it in the parent (usually using state) and pass the new value down as props.

Key Takeaway

Props let a parent component configure a child component by passing different kinds of data. The child should use those values, not modify them. This one-way flow—from parent to child—is a core React concept and makes components predictable and reusable.

// doubt cleared
function Button({ greet }) { return ( <button onClick={() => greet("Nikhil")}> Click </button> ); } Output Hello Nikhil Notice we wrap it in an arrow function so it runs **only when clicked**, not during rendering.

what if we pass direct i mean not using arrow function using simple fn

Great question. This is one of the most common React interview questions.

Suppose you have:

function App() {
  function greet(name) {
    alert(`Hello ${name}`);
  }

  return <Button greet={greet} />;
}
Case 1: Using an arrow function (Correct)
function Button({ greet }) {
  return (
    <button onClick={() => greet("Nikhil")}>
      Click
    </button>
  );
}
What happens?

When React renders:

<button onClick={() => greet("Nikhil")}>

React stores the arrow function as the click handler.

Nothing happens yet.

Only when you click the button:

Button Click
      ↓
Arrow function runs
      ↓
greet("Nikhil")
      ↓
Alert: Hello Nikhil
Case 2: Calling it directly (Wrong)
function Button({ greet }) {
  return (
    <button onClick={greet("Nikhil")}>
      Click
    </button>
  );
}
What happens?

During rendering React sees

greet("Nikhil")

Notice the ().

That means:

"Call this function immediately."

So React executes it while rendering.

Component renders
      ↓
greet("Nikhil") executes
      ↓
Alert appears immediately
      ↓
Its return value becomes onClick

If greet doesn't return a function (it usually returns undefined), then React effectively does:

<button onClick={undefined}>

Now clicking the button does nothing.

Visual Difference
✅ Correct
onClick={() => greet("Nikhil")}
Render
   ↓
Store function
   ↓
User clicks
   ↓
Function executes
❌ Wrong
onClick={greet("Nikhil")}
Render
   ↓
Function executes immediately
   ↓
Returns undefined
   ↓
Nothing left for click event
Case 3: Passing the function directly (No arguments)

If your function doesn't need arguments, you can pass it directly.

function greet() {
  alert("Hello");
}

<button onClick={greet}>
  Click
</button>

This is perfectly fine.

Notice:

onClick={greet}

Not

onClick={greet()}

Here, onClick receives a reference to the function, so React can call it later when the button is clicked.

Rule to Remember
Code	Executes When?
onClick={greet}	On click ✅
onClick={() => greet()}	On click ✅
onClick={() => greet("Nikhil")}	On click ✅
onClick={greet()}	During render ❌
onClick={greet("Nikhil")}	During render ❌
Interview Tip

A common question is:

Why do we use an arrow function in onClick?

A good answer is:

We use an arrow function when we need to pass arguments or perform multiple operations before calling the actual function. The arrow function delays execution until the event occurs. Without it, the function would execute immediately during rendering.