import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryProvider } from "./components/providers/query-provider.tsx";
import { AuthProvider } from "./components/providers/auth-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>
);
