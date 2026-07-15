Forms are one of the most important concepts in React because they allow users to enter and submit data.

Examples:

Login Form
Signup Form
Contact Form
Search Bar
Add Product Form

In React, forms are usually handled using Controlled Components.

What is a Controlled Component?

A controlled component is a form element whose value is controlled by React state.

Instead of letting HTML manage the input value, React does it.

Normal HTML
<input type="text">

The browser stores whatever the user types.

React
const [name, setName] = useState("");

Now React stores the value.

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

Here:

value={name} → The input displays the value from React state.
onChange → Updates the state whenever the user types.
Example 1: Text Input
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2>{name}</h2>
    </>
  );
}

export default App;
Flow
User types

↓

onChange fires

↓

e.target.value gets current text

↓

setName()

↓

State updates

↓

Component re-renders

↓

Input and <h2> show the latest value
Understanding onChange
onChange={(e) => setName(e.target.value)}

Suppose the user types:

N

Then:

e.target.value

becomes

"N"

After typing:

Ni

then

e.target.value

is

"Ni"

React updates the state after every keystroke.

Example 2: Multiple Inputs
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <h3>{form.name}</h3>
      <h3>{form.email}</h3>
    </>
  );
}
Why use [e.target.name]?

If the user types in:

name="name"

then

e.target.name

is "name".

If the user types in:

name="email"

then

e.target.name

is "email".

So one function can update any input.

Example 3: Form Submission
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}
Why preventDefault()?

Normally,

Submit Button

↓

Browser reloads page

↓

All React state is lost

Using:

e.preventDefault();

prevents the page refresh, allowing React to handle the submission.

Example 4: Checkbox
import { useState } from "react";

function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <input
        type="checkbox"
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
      />

      <p>{accepted ? "Accepted" : "Not Accepted"}</p>
    </>
  );
}

For checkboxes, use:

e.target.checked

instead of e.target.value.

Example 5: Select Dropdown
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select City</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Jaipur">Jaipur</option>
      </select>

      <h2>{city}</h2>
    </>
  );
}
Controlled vs Uncontrolled Components
Controlled
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
React controls the value.
Easier to validate and manipulate.
Most commonly used.
Uncontrolled
<input type="text" />

The browser manages the value. React doesn't know what's inside unless you access it with a ref.

Common Mistakes
❌ Forgetting onChange
<input value={name} />

The input becomes read-only because React controls the value but never updates it.

❌ Forgetting value
<input onChange={(e) => setName(e.target.value)} />

This works, but the input is uncontrolled. To make it controlled, provide the value prop.

❌ Updating the object without spreading
setForm({
  name: "John",
});

If form also had an email, it would be lost.

Correct:

setForm({
  ...form,
  name: "John",
});
Summary
Form Element	Property to Read
Text Input	e.target.value
Textarea	e.target.value
Select	e.target.value
Checkbox	e.target.checked
Interview Questions

1. What is a controlled component?
A form element whose value is managed by React state using value (or checked) and updated with onChange.

2. Why do we use preventDefault()?
To stop the browser's default form submission, which reloads the page.

3. Why use one handleChange for multiple inputs?
By using the input's name attribute and computed property names ([e.target.name]), a single function can update different fields.