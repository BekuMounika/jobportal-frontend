import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/applications"
          element={<Applications />}
        />

        <Route
          path="/addjob"
          element={<AddJob />}
        />

        <Route
          path="/editjob/:id"
          element={<EditJob />}
        />
        <Route
  path="/profile"
  element={<Profile />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;