import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1c222f",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              },
              success: {
                iconTheme: {
                  primary: "#8b5cf6",
                  secondary: "#fff",
                },
              },
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
