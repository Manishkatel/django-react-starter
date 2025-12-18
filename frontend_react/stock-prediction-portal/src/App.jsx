import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          {/* Header has access to AuthContext */}
          <Header />

          {/* Main content area that grows to push footer down */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* You can add protected/private routes later here */}
            </Routes>
          </main>

          {/* Footer stays at the bottom of the page */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
