import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from "./context/AuthContext";

// Function to mount React into correct root
function mountReactApp() {
  // Try extension sidebar root
  let rootElement = document.getElementById('ai-sidebar-root');

  // If running in normal dev mode (vite dev server)
  if (!rootElement) {
    rootElement = document.getElementById('root');
  }

  // If still not found, create fallback (rare)
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'ai-sidebar-root';
    document.body.appendChild(rootElement);
  }

  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountReactApp);
} else {
  mountReactApp();
}
