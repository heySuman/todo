import Home from "./pages/Home";
import Login from "./pages/login";
import ProtectedRoute from "./components/protected-route";
import Signup from "./pages/signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />

        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="/" index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
