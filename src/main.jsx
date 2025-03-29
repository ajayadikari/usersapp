import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Layout from './Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import usersReducers from './redux/userSlice.js';
import { ToastContainer } from 'react-toastify';

// Configure Redux store
const store = configureStore({
  reducer: {
    users: usersReducers,
  },
});

// Define routes and structure
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<LoginPage />} />
      
      {/* Protected route with nested children */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} /> {/* Protected HomePage route */}
      </Route>
    </Route>
  )
);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
