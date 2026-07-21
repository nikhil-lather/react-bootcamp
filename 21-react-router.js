What is React Router?

React Router is a library used to add routing (navigation) in React applications.

Instead of loading a new HTML page from the server, React Router changes the URL and displays different components without refreshing the page.

Without React Router
Home.html
About.html
Contact.html

Every click reloads the entire page.

With React Router
Home Component
About Component
Contact Component

Only the required component changes.

Why do we need React Router?

Without React Router:

Full page refresh
Slower navigation
React state gets reset

With React Router:

Fast navigation
No page reload
Maintains React state
Better user experience



RouterProvider: Wraps the app and enables React Router features.
createBrowserRouter(): Creates a route configuration by mapping URLs to React components.
Layout Route: Allows shared UI (Navbar, Sidebar, Footer) while rendering child routes in an Outlet.
Outlet: Placeholder where matched child routes are rendered.
Link: Navigates between routes without reloading the page.
useNavigate(): Used for programmatic navigation (e.g., after login or form submission).
Loader: Fetches data before a route renders.
useLoaderData(): Accesses data returned by the route's loader.
Action: Handles form submissions for a route.
React Router Form: Submits data directly to the route's action without manually handling onSubmit

Step 2: Create Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import CreatePost from "./CreatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
]);
Explanation

createBrowserRouter() creates a routing table.

Think of it as:

URL                Component

/        ------->   App

/create-post --->   CreatePost

Whenever the URL changes,

React Router checks the mapping and renders the correct component.

Step 3: Provide Router :: enables React Router features in the app.


Why Outlet?

Because it renders child routes inside the parent layout.
const router = createBrowserRouter([
{
element:<Layout/>,

children:[
{
path:"/",
element:<Home/>
},
{
path:"about",
element:<About/>
}]}])

Layout.jsx
import { Outlet } from "react-router-dom";

function Layout(){
return(
<>
<Navbar/>

<Outlet/>

<Footer/>
</>
)}

49. Link & useNavigate

There are two ways to navigate.

1. Link

Used when the user clicks something.

Example

Navbar

<Link to="/">Home</Link>

<Link to="/about">About</Link>

<Link to="/contact">Contact</Link>

When clicked,

React changes page

WITHOUT

window reload

Unlike HTML

<a href="/about">

which reloads the entire website.

Example
Home

↓

Click About

↓

About Component

(No Reload)
2. useNavigate()

Suppose after login,

you want to automatically go to Dashboard.

Nobody clicks anything.

React should redirect.

That's where

useNavigate()

comes.

Example

import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

function handleLogin(){

// Login Success

navigate("/dashboard");

}

return(
<button onClick={handleLogin}>
Login
</button>
)

}