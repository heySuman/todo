import { useState } from "react";
import Login from "./pages/login";
import MainComponent from "./pages/main";
import ProtectedRoute from "./pages/protected-route";
import Signup from "./pages/signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
          path="/login"
        />
        <Route element={<Signup />} path="/signup" />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<MainComponent />} path="/"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
