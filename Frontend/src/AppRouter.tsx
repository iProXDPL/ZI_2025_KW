import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./contexts/AuthContext";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
