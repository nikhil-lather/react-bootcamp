A Custom Hook is a JavaScript function that uses one or more React Hooks (useState, useEffect, useContext, etc.) to reuse stateful logic across multiple components.

Instead of copying the same logic into different components, you write it once in a custom hook and reuse it.

Why Do We Need Custom Hooks?

Imagine you have two components that both need to fetch users from an API.

Without a Custom Hook

Component A

import { useState, useEffect } from "react";

function Users() {
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

Component B

import { useState, useEffect } from "react";

function Employees() {
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

Notice that the fetching logic is duplicated.

Solution: Custom Hook

Create a file:

hooks/
 └── useUsers.js
import { useState, useEffect } from "react";

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return users;
}

export default useUsers;

Now use it anywhere.

import useUsers from "./hooks/useUsers";

function Users() {
  const users = useUsers();

  return (
    <>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}

Another component:

import useUsers from "./hooks/useUsers";

function Employees() {
  const users = useUsers();

  return (
    <>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}

The fetching logic is written once and reused.

How Does It Work?

When you call:

const users = useUsers();

React executes the useUsers function.

Inside it:

const [users, setUsers] = useState([]);

creates state for that component.

Then:

useEffect(() => {
  fetch(...);
}, []);

runs after the component mounts.

When the data arrives:

setUsers(data);

updates the hook's state, causing the component using the hook to re-render.

Finally:

return users;

returns the current state back to the component.