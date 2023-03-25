import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NewYorkTimes from "./pages/NewYorkTimes";
import TheGuardian from "./pages/TheGuardian";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./authentication/authGuard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="/news" element={<News />} />
            <Route path="/theguardian" element={<TheGuardian />} />
            <Route path="/newyorktimes" element={<NewYorkTimes />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
