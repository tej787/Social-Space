import { useSelector } from "react-redux";
import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Route, Routes, Navigate } from 'react-router-dom'

import PasswordUpdate from "./pages/PasswordUpdate/PasswordUpdate";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import EmailSent from "./pages/EmailSent/EmailSent";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Chat from "./pages/Chat/Chat";


function App() {
  const user = useSelector((state) => state.authReducer.authData)
  return (

    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/forgotPassword"
          element={user ? <Navigate to="../home" /> : <ForgotPassword />}
        />
        <Route
          path="/sentEmail/:email"
          element={user ? <Navigate to="../home" /> : <EmailSent />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/resetPassword/:token"
          element={user ? <Navigate to="../home" /> : <ResetPassword />}

        />
        <Route
          path="/passwordUpdate"
          element={user ? <PasswordUpdate /> : <Navigate to="../auth" />}
        />

        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
