import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationContextProvider } from "./notificationContext";
import { UserContextProvider } from "./userContext";
import { QueryClient, QueryClientProvider } from 'react-query'
import {BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
            <NotificationContextProvider>
                <Router>
                    <App />
                </Router>
            </NotificationContextProvider>
        </UserContextProvider>
    </QueryClientProvider>);
