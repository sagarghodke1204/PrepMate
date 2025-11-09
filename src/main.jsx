import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// --- IMPORT THE AUTH PROVIDER ---
import { AuthProvider } from './AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* --- WRAP YOUR APP --- */}
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);