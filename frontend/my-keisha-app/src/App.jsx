import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LoginSignup from "./Components/LoginSignup";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import Restaurant from "./Components/Restaurant";
import Menu from "./Components/Menu";
import Orders from "./Components/Orders";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import Settings from "./Components/Settings";

// 🔹 Simple auth check
const isAuthenticated = () => !!localStorage.getItem("username");

// 🔹 ProtectedRoute component
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/auth" />;
}

// 🔹 Layout wrapper to show navbar/footer
function Layout({ children }) {
  const location = useLocation();
  const hideFooter = location.pathname === "/auth";

  return (
    <>
      <Navbar />
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<LoginSignup />} />

        <Route
          path="/Homepage"
          element={
            <ProtectedRoute>
              <Layout>
                <Homepage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Restaurant"
          element={
            <ProtectedRoute>
              <Layout>
                <Restaurant />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Menu"
          element={
            <ProtectedRoute>
              <Layout>
                <Menu />
              </Layout>
            </ProtectedRoute>
          }
           />
           <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Cart"
          element={
            <ProtectedRoute>
              <Layout>
                <Cart />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Checkout"
          element={
            <ProtectedRoute>
              <Layout>
                <Checkout />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
