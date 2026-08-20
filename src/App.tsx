// import { Button } from "./components/ui/button"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./screens/home/Home"
import { DashboardScreen } from "./screens/dashboard/DashboardScreen"
import { LoginScreen } from "./screens/LoginScreen"
import SignUp from "./screens/SignUpScreen"
import Profile from "./screens/profile/Profile"
import ChangePassword from "./screens/CPassword/ChangePassword"
import ProtectedRoutes from "./components/ProtectedRoutes"
import AuthProtectedRoutes from "./components/AuthProtectedRoutes"

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<AuthProtectedRoutes AuthComponents={LoginScreen} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoutes Components={DashboardScreen} />}
          />
          <Route
            path="/SignUp"
            element={<AuthProtectedRoutes AuthComponents={SignUp} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/CPassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
