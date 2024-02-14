import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { themeSettings } from "./theme";

import {
  HomePage,
  LoginPage,
  ProfilePage,
  NotFoundPage,
  RegisterPage,
} from "./pages";
import { Navbar, Footer } from "./components";

function App() {
  const { mode } = useSelector((state) => state.general);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {location.pathname !== "/" && location.pathname !== "/register" && (
          <Navbar isNavigate />
        )}
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/home" /> : <RegisterPage />}
          />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {location.pathname !== "/" && location.pathname !== "/register" && (
          <Footer />
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
