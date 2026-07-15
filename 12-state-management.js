State management in React is the process of storing, updating, and sharing data that changes over time and affects what is displayed in your UI.

For example:

A counter value
User login status
Shopping cart items
Form inputs
Theme (light/dark mode)
Types of State in React
1. Local State (useState)

Used when the state is only needed inside a single component.

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

Use when:

Form fields
Toggle buttons
Counters
Modal open/close state
2. Shared State (useContext)

When multiple components need the same data.

Example:

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
      <Home />
    </ThemeContext.Provider>
  );
}

Now both Navbar and Home can access the theme without passing props through every component.

Use when:

Theme
Authentication
Language
User profile
3. Global State

For large applications where many unrelated components need the same data.

Popular libraries include:

Redux Toolkit
Zustand
MobX
Recoil (less commonly used today)
Jotai

Example with Redux Toolkit:

// counterSlice.js
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
});

Then any component can access it:

const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();

<button onClick={() => dispatch(increment())}>
  Increment
</button>

Use when:

Shopping carts
Authentication
Notifications
Dashboard data
Large applications
4. Server State

Data that comes from an API should usually be managed separately from UI state.

Libraries like TanStack Query (React Query) or SWR handle:

Fetching
Caching
Background updates
Loading/error states
Automatic refetching

Example:

const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
When to Use What
Scenario	Best Choice
Counter -->	useState
Form inputs -->	useState
Modal visibility -->	useState
Theme -->	useContext
Logged-in user -->	useContext or Redux/Zustand
Shopping cart -->	Redux Toolkit or Zustand
API data -->	TanStack Query
Large enterprise app -->	Redux Toolkit + TanStack Query
State Management Flow
User Action
      │
      ▼
Update State
      │
      ▼
React Re-renders Component
      │
      ▼
Updated UI
Which State Management Solution Should You Learn?

A practical learning path is:

✅ useState – Learn component state first.
✅ useEffect – Handle side effects like API calls.
✅ useContext – Share state across components.
✅ Redux Toolkit or Zustand – Manage complex global state.
✅ TanStack Query – Manage server/API state efficiently.

For most modern React applications:

Use useState for local UI state.
Use useContext for simple shared state.
Use Redux Toolkit or Zustand for complex global state.
Use TanStack Query for API/server state instead of storing fetched data manually.