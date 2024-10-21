import { useEffect, useState } from "react";
import Login from "./pages/login";
import MainComponent from "./pages/main";
import ProtectedRoute from "./pages/protected-route";
import Signup from "./pages/signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "../firebase";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  // for persistant login
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setUser(user);
      }

      setLoading(false);
    });
  }, []);

  if (loading) return <>Loading ...</>;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Login setUser={setUser} user={user} />}
          path="/login"
        />
        <Route element={<Signup />} path="/signup" />

        <Route element={<ProtectedRoute user={user} />}>
          <Route element={<MainComponent />} path="/" index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
