import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const Login = lazy(() => import("./pages/Login"));
const Posts = lazy(() => import("./pages/Post"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={!token ? <Login /> : <Navigate to="/posts" replace />}
          />
          <Route
            path="/posts"
            element={token ? <Posts /> : <Navigate to="/" replace />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
