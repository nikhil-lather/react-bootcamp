// naming convention

1. Component Names

✅ PascalCase

function UserCard() {}

function Navbar() {}

function LoginPage() {}

❌ Avoid

function userCard() {}

function navbar() {}
2. File Names

Use PascalCase for component files.

Navbar.jsx
UserCard.jsx
ProductList.jsx
LoginForm.jsx

Other files (choose one style and stay consistent):

utils.js
constants.js
api.js
3. Custom Hooks

Always start with use

useFetch()
useAuth()
useTheme()
useLocalStorage()

❌ Wrong

fetchData()
authHook()
theme()

React recognizes Hooks by the use prefix.

4. Variables

Use camelCase

const firstName = "Nikhil";
const totalPrice = 100;
const isLoggedIn = true;
5. Functions

Use camelCase

function handleClick() {}

function fetchUsers() {}

function calculateTotal() {}
6. Event Handlers

Start with handle

handleClick()

handleSubmit()

handleDelete()

handleChange()
7. Props

Use camelCase

<UserCard userName="Nikhil" />

<Button isDisabled={true} />
8. State Variables

Use meaningful names.

const [count, setCount] = useState(0);

const [users, setUsers] = useState([]);

const [loading, setLoading] = useState(false);

Setter format:

set + StateName

Examples

setUser()

setTheme()

setProducts()
9. Boolean Variables

Start with

is
has
can
should
isLoading

isAdmin

hasPermission

canEdit

shouldRender
10. Constants

Use UPPER_SNAKE_CASE

const API_URL = "...";

const MAX_USERS = 10;

const PI = 3.14;
11. CSS Class Names

Use kebab-case

.user-card

.navbar-item

.login-form

Tailwind classes are written directly in className.

12. Context

Name

AuthContext

ThemeContext

UserContext

Provider

<AuthProvider>

<ThemeProvider>
13. Reducers
userReducer

cartReducer

themeReducer
14. Action Types

Usually

ADD_ITEM

DELETE_ITEM

LOGIN_USER

LOGOUT_USER
15. Folder Names

Mostly lowercase.

components/

pages/

16. API Functions

Use verbs.

getUsers()

createUser()

17. Refs

End with Ref

const inputRef = useRef();

const videoRef = useRef();

20. Environment Variables (Vite)

Must start with VITE_

VITE_API_URL=http://localhost:5000

VITE_APP_NAME=Jobify

Use them like this:

const api = import.meta.env.VITE_API_URL;